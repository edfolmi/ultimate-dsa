let pyodideReadyPromise = null;
let pyodideInstance = null;
let currentProblem = null;
let currentLanguage = 'javascript';


function initMonacoEditor() {
    require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs' }});
    require(['vs/editor/editor.main'], function () {
        editor = monaco.editor.create(document.getElementById('codeEditor'), {
            value: '', // We'll set the starter code dynamically
            language: currentLanguage,
            theme: 'vs-dark',
            automaticLayout: true,
            fontSize: 14,
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initMonacoEditor();
});

async function initPyodide() {
    if (!pyodideReadyPromise) {
        pyodideReadyPromise = loadPyodide();
        pyodideInstance = await pyodideReadyPromise;
    }
    return pyodideInstance;
}

// Helper function to compare arrays of arrays (order-independent)
function compareGroupedArrays(result, expected) {
    if (result.length !== expected.length) return false;

    const sortedResult = result.map(arr => [...arr].sort()).sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
    const sortedExpected = expected.map(arr => [...arr].sort()).sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));

    return JSON.stringify(sortedResult) === JSON.stringify(sortedExpected);
}

const problemData = {
    problem1: {
        title: '1. Group Anagrams',
        description: 'Group anagrams together from an array of strings',
        javascript: {
            starter: `function groupAnagrams(strs) {\n    // Write your code here\n    \n}`,
            testCases: [
                { input: [["eat", "tea", "tan", "ate", "nat", "bat"]], expected: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]], desc: 'strs = ["eat","tea","tan","ate","nat","bat"]' },
                { input: [[""]], expected: [[""]], desc: 'strs = [""]' },
                { input: [["a"]], expected: [["a"]], desc: 'strs = ["a"]' },
                { input: [["abc", "bca", "cab", "xyz", "zyx", "yxz"]], expected: [["abc", "bca", "cab"], ["xyz", "zyx", "yxz"]], desc: 'strs = ["abc","bca","cab","xyz","zyx","yxz"]' },
            ]
        },
        python: {
            starter: `def group_anagrams(strs):\n    # Write your code here\n    pass`,
            testCases: [
                { input: [["eat", "tea", "tan", "ate", "nat", "bat"]], expected: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]], desc: 'strs = ["eat","tea","tan","ate","nat","bat"]' },
                { input: [[""]], expected: [[""]], desc: 'strs = [""]' },
                { input: [["a"]], expected: [["a"]], desc: 'strs = ["a"]' },
                { input: [["abc", "bca", "cab", "xyz", "zyx", "yxz"]], expected: [["abc", "bca", "cab"], ["xyz", "zyx", "yxz"]], desc: 'strs = ["abc","bca","cab","xyz","zyx","yxz"]' },
            ]
        },
        java: {
            starter: `public List<List<String>> groupAnagrams(String[] strs) {\n    // Write your code here\n    return new ArrayList<>();\n}`,
            testCases: []
        },
        cpp: {
            starter: `vector<vector<string>> groupAnagrams(vector<string>& strs) {\n    // Write your code here\n    return {};\n}`,
            testCases: []
        }
    },
    problem2: {
        title: '2. Longest Consecutive Sequence',
        description: 'Find the length of the longest consecutive sequence',
        javascript: {
            starter: `function longestConsecutive(nums) {\n    // Write your code here\n    \n}`,
            testCases: [
                { input: [[100, 4, 200, 1, 3, 2]], expected: 4, desc: 'nums = [100,4,200,1,3,2]' },
                { input: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]], expected: 9, desc: 'nums = [0,3,7,2,5,8,4,6,0,1]' },
                { input: [[]], expected: 0, desc: 'nums = []' },
                { input: [[9, 1, 4, 7, 3, -1, 0, 5, 8, -2, 6]], expected: 7, desc: 'nums = [9,1,4,7,3,-1,0,5,8,-2,6]' },
            ]
        },
        python: {
            starter: `def longest_consecutive(nums):\n    # Write your code here\n    pass`,
            testCases: [
                { input: [[100, 4, 200, 1, 3, 2]], expected: 4, desc: 'nums = [100,4,200,1,3,2]' },
                { input: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]], expected: 9, desc: 'nums = [0,3,7,2,5,8,4,6,0,1]' },
                { input: [[]], expected: 0, desc: 'nums = []' },
                { input: [[9, 1, 4, 7, 3, -1, 0, 5, 8, -2, 6]], expected: 7, desc: 'nums = [9,1,4,7,3,-1,0,5,8,-2,6]' },
            ]
        },
        java: {
            starter: `public int longestConsecutive(int[] nums) {\n    // Write your code here\n    return 0;\n}`,
            testCases: []
        },
        cpp: {
            starter: `int longestConsecutive(vector<int>& nums) {\n    // Write your code here\n    return 0;\n}`,
            testCases: []
        }
    }
};

function switchLanguage(lang) {
    currentLanguage = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    const problem = problemData[currentProblem][lang];
    if (editor) {
        editor.setValue(problem.starter);
        let monacoLang = 'javascript';
        if (lang === 'python') monacoLang = 'python';
        else if (lang === 'java') monacoLang = 'java';
        else if (lang === 'cpp') monacoLang = 'cpp';
        monaco.editor.setModelLanguage(editor.getModel(), monacoLang);
    }
}


function openPlayground(problemId) {
    currentProblem = problemId;
    currentLanguage = 'javascript';
    const problem = problemData[problemId];

    document.getElementById('playgroundTitle').textContent = problem.title;
    document.getElementById('playgroundDescription').textContent = problem.description;

    if (editor) {
        editor.setValue(problem.javascript.starter);
        monaco.editor.setModelLanguage(editor.getModel(), 'javascript');
    }

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === 'javascript');
    });

    document.getElementById('testResults').innerHTML = '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #a3a3a3;"><p>Run tests to see results</p></div>';

    document.getElementById('playgroundModal').classList.add('show');
}

function resetCode() {
    const problem = problemData[currentProblem][currentLanguage];
    if (editor) editor.setValue(problem.starter);
}


function closePlayground() {
    document.getElementById('playgroundModal').classList.remove('show');
}

async function runPythonTests() {
    const code = editor.getValue();
    const problem = problemData[currentProblem][currentLanguage];
    const resultsDiv = document.getElementById('testResults');

    resultsDiv.innerHTML = '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 1rem;"><div class="spinner"></div><p style="color: #a3a3a3;">Loading Python environment...</p></div>';
    resultsDiv.scrollTop = 0;

    try {
        const pyodide = await initPyodide();

        resultsDiv.innerHTML = '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 1rem;"><div class="spinner"></div><p style="color: #a3a3a3;">Running tests...</p></div>';

        let passedTests = 0;
        let resultsHTML = '';

        for (let i = 0; i < problem.testCases.length; i++) {
            const test = problem.testCases[i];
            try {
                const funcName = currentProblem === 'problem1' ? 'group_anagrams' : 'longest_consecutive';
                const testCode = `
${code}
result = ${funcName}(${JSON.stringify(test.input[0])})
`;

                await pyodide.runPythonAsync(testCode);
                let result = pyodide.globals.get('result');

                if (result && typeof result === 'object' && result.toJs) {
                    result = result.toJs();
                    if (result && typeof result === 'object' && result[Symbol.iterator]) {
                        result = Array.from(result, item => {
                            if (item && typeof item === 'object' && item[Symbol.iterator]) {
                                return Array.from(item);
                            }
                            return item;
                        });
                    }
                }

                let passed;
                if (currentProblem === 'problem1') {
                    passed = compareGroupedArrays(result, test.expected);
                } else {
                    passed = JSON.stringify(result) === JSON.stringify(test.expected);
                }

                if (passed) passedTests++;

                resultsHTML += `
                            <div class="test-case ${passed ? 'passed' : 'failed'}">
                                <div class="test-case-header">
                                    <span style="font-weight: 600;">Test ${i + 1}</span>
                                    <span class="test-status">${passed ? '✓ Passed' : '✗ Failed'}</span>
                                </div>
                                <div class="test-case-body">
                                    <div><strong>Input:</strong> ${test.desc}</div>
                                    <div><strong>Expected:</strong> ${JSON.stringify(test.expected)}</div>
                                    <div><strong>Got:</strong> ${JSON.stringify(result)}</div>
                                </div>
                            </div>
                        `;
            } catch (err) {
                resultsHTML += `
                            <div class="test-case failed">
                                <div class="test-case-header">
                                    <span style="font-weight: 600;">Test ${i + 1}</span>
                                    <span class="test-status">✗ Error</span>
                                </div>
                                <div class="test-case-body">
                                    <div style="color: #ef4444;">${err.message}</div>
                                </div>
                            </div>
                        `;
            }
        }

        const allPassed = passedTests === problem.testCases.length;
        resultsHTML = `
                    <div class="test-summary ${allPassed ? 'success' : (passedTests > 0 ? 'partial' : 'error')}">
                        <div>
                            <div style="font-size: 1.1rem; font-weight: 600;">${allPassed ? 'All Tests Passed! 🎉' : (passedTests > 0 ? 'Some Tests Failed' : 'All Tests Failed')}</div>
                            <div style="font-size: 0.9rem;">${passedTests} / ${problem.testCases.length} tests passed</div>
                        </div>
                    </div>
                    ${resultsHTML}
                `;
        resultsDiv.innerHTML = resultsHTML;

        setTimeout(() => {
            resultsDiv.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);

    } catch (err) {
        resultsDiv.innerHTML = `
                    <div class="test-summary error">
                        <div>
                            <div style="font-size: 1.1rem; font-weight: 600;">Error</div>
                            <div style="font-size: 0.9rem;">${err.message}</div>
                        </div>
                    </div>
                `;
        resultsDiv.scrollTop = 0;
    }
}

async function runJavaScriptTests() {
    const code = editor.getValue();
    const problem = problemData[currentProblem][currentLanguage];
    const resultsDiv = document.getElementById('testResults');

    resultsDiv.innerHTML = '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 1rem;"><div class="spinner"></div><p style="color: #a3a3a3;">Running tests...</p></div>';
    resultsDiv.scrollTop = 0;

    setTimeout(() => {
        try {
            const userFunction = new Function('return ' + code)();
            let passedTests = 0;
            let resultsHTML = '';

            problem.testCases.forEach((test, index) => {
                try {
                    const result = userFunction(test.input[0]);

                    let passed;
                    if (currentProblem === 'problem1') {
                        passed = compareGroupedArrays(result, test.expected);
                    } else {
                        passed = JSON.stringify(result) === JSON.stringify(test.expected);
                    }

                    if (passed) passedTests++;

                    resultsHTML += `
                                <div class="test-case ${passed ? 'passed' : 'failed'}">
                                    <div class="test-case-header">
                                        <span style="font-weight: 600;">Test ${index + 1}</span>
                                        <span class="test-status">${passed ? '✓ Passed' : '✗ Failed'}</span>
                                    </div>
                                    <div class="test-case-body">
                                        <div><strong>Input:</strong> ${test.desc}</div>
                                        <div><strong>Expected:</strong> ${JSON.stringify(test.expected)}</div>
                                        <div><strong>Got:</strong> ${JSON.stringify(result)}</div>
                                    </div>
                                </div>
                            `;
                } catch (err) {
                    resultsHTML += `
                                <div class="test-case failed">
                                    <div class="test-case-header">
                                        <span style="font-weight: 600;">Test ${index + 1}</span>
                                        <span class="test-status">✗ Error</span>
                                    </div>
                                    <div class="test-case-body">
                                        <div style="color: #ef4444;">${err.message}</div>
                                    </div>
                                </div>
                            `;
                }
            });

            const allPassed = passedTests === problem.testCases.length;
            resultsHTML = `
                        <div class="test-summary ${allPassed ? 'success' : (passedTests > 0 ? 'partial' : 'error')}">
                            <div>
                                <div style="font-size: 1.1rem; font-weight: 600;">${allPassed ? 'All Tests Passed! 🎉' : (passedTests > 0 ? 'Some Tests Failed' : 'All Tests Failed')}</div>
                                <div style="font-size: 0.9rem;">${passedTests} / ${problem.testCases.length} tests passed</div>
                            </div>
                        </div>
                        ${resultsHTML}
                    `;
            resultsDiv.innerHTML = resultsHTML;

            setTimeout(() => {
                resultsDiv.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);

        } catch (err) {
            resultsDiv.innerHTML = `
                        <div class="test-summary error">
                            <div>
                                <div style="font-size: 1.1rem; font-weight: 600;">Syntax Error</div>
                                <div style="font-size: 0.9rem;">${err.message}</div>
                            </div>
                        </div>
                    `;
            resultsDiv.scrollTop = 0;
        }
    }, 500);
}

async function runTests() {
    if (currentLanguage === 'java' || currentLanguage === 'cpp') {
        alert('Test execution for ' + currentLanguage.toUpperCase() + ' coming soon!');
        return;
    }

    const runBtn = document.getElementById('runBtn');
    runBtn.disabled = true;
    runBtn.innerHTML = '⏳ Running...';

    try {
        if (currentLanguage === 'python') {
            await runPythonTests();
        } else {
            await runJavaScriptTests();
        }
    } finally {
        runBtn.disabled = false;
        runBtn.innerHTML = '▶ Run Tests';
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePlayground();
});

document.getElementById('playgroundModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'playgroundModal') closePlayground();
});