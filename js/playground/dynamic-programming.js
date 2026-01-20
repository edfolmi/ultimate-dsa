// dynamic-programming.js
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

// Initialize Pyodide
async function initPyodide() {
    if (!pyodideReadyPromise) {
        pyodideReadyPromise = loadPyodide();
        pyodideInstance = await pyodideReadyPromise;
    }
    return pyodideInstance;
}

const problemData = {
    problem1: {
        title: '1. Climbing Stairs',
        description: 'You can climb 1 or 2 steps. How many ways to reach n steps?',
        javascript: {
            starter: `function climbStairs(n) {\n    // Write your code here\n    \n}`,
            testCases: [
                { input: [2], expected: 2, desc: 'n = 2' },
                { input: [3], expected: 3, desc: 'n = 3' },
                { input: [1], expected: 1, desc: 'n = 1' },
            ]
        },
        python: {
            starter: `def climb_stairs(n):\n    # Write your code here\n    pass`,
            testCases: [
                { input: [2], expected: 2, desc: 'n = 2' },
                { input: [3], expected: 3, desc: 'n = 3' },
                { input: [1], expected: 1, desc: 'n = 1' },
            ]
        },
        java: {
            starter: `public int climbStairs(int n) {\n    // Write your code here\n    return 0;\n}`,
            testCases: []
        },
        cpp: {
            starter: `int climbStairs(int n) {\n    // Write your code here\n    return 0;\n}`,
            testCases: []
        }
    },
    problem2: {
        title: '2. Longest Increasing Subsequence',
        description: 'Find the length of the longest increasing subsequence',
        javascript: {
            starter: `function lengthOfLIS(nums) {\n    // Write your code here\n    \n}`,
            testCases: [
                { input: [[10, 9, 2, 5, 3, 7, 101, 18]], expected: 4, desc: '[10,9,2,5,3,7,101,18]' },
                { input: [[0, 1, 0, 3, 2, 3]], expected: 4, desc: '[0,1,0,3,2,3]' },
                { input: [[7, 7, 7, 7, 7, 7, 7]], expected: 1, desc: '[7,7,7,7,7,7,7]' },
            ]
        },
        python: {
            starter: `def length_of_lis(nums):\n    # Write your code here\n    pass`,
            testCases: [
                { input: [[10, 9, 2, 5, 3, 7, 101, 18]], expected: 4, desc: '[10,9,2,5,3,7,101,18]' },
                { input: [[0, 1, 0, 3, 2, 3]], expected: 4, desc: '[0,1,0,3,2,3]' },
                { input: [[7, 7, 7, 7, 7, 7, 7]], expected: 1, desc: '[7,7,7,7,7,7,7]' },
            ]
        },
        java: {
            starter: `public int lengthOfLIS(int[] nums) {\n    // Write your code here\n    return 0;\n}`,
            testCases: []
        },
        cpp: {
            starter: `int lengthOfLIS(vector<int>& nums) {\n    // Write your code here\n    return 0;\n}`,
            testCases: []
        }
    },
    problem3: {
        title: '3. Coin Change',
        description: 'Find the minimum number of coins to make up the amount',
        javascript: {
            starter: `function coinChange(coins, amount) {\n    // Write your code here\n    \n}`,
            testCases: [
                { input: [[1, 2, 5], 11], expected: 3, desc: 'coins = [1,2,5], amount = 11' },
                { input: [[2], 3], expected: -1, desc: 'coins = [2], amount = 3' },
                { input: [[1], 0], expected: 0, desc: 'coins = [1], amount = 0' },
            ]
        },
        python: {
            starter: `def coin_change(coins, amount):\n    # Write your code here\n    pass`,
            testCases: [
                { input: [[1, 2, 5], 11], expected: 3, desc: 'coins = [1,2,5], amount = 11' },
                { input: [[2], 3], expected: -1, desc: 'coins = [2], amount = 3' },
                { input: [[1], 0], expected: 0, desc: 'coins = [1], amount = 0' },
            ]
        },
        java: {
            starter: `public int coinChange(int[] coins, int amount) {\n    // Write your code here\n    return 0;\n}`,
            testCases: []
        },
        cpp: {
            starter: `int coinChange(vector<int>& coins, int amount) {\n    // Write your code here\n    return 0;\n}`,
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

    try {
        const pyodide = await initPyodide();

        resultsDiv.innerHTML = '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 1rem;"><div class="spinner"></div><p style="color: #a3a3a3;">Running tests...</p></div>';

        let passedTests = 0;
        let resultsHTML = '';

        for (let i = 0; i < problem.testCases.length; i++) {
            const test = problem.testCases[i];
            try {
                let testCode = `
${code}
result = ${currentProblem === 'problem1' ? 'climb_stairs' : currentProblem === 'problem2' ? 'length_of_lis' : 'coin_change'}(${JSON.stringify(test.input[0])}${test.input.length > 1 ? ', ' + test.input[1] : ''})
`;

                await pyodide.runPythonAsync(testCode);
                let result = pyodide.globals.get('result');

                const passed = JSON.stringify(result) === JSON.stringify(test.expected);
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
                    <div style="font-size: 0.8rem; font-weight: 600;">${allPassed ? 'All Tests Passed! 🎉' : (passedTests > 0 ? 'Some Tests Failed' : 'All Tests Failed')}</div>
                    <div style="font-size: 0.6rem;">${passedTests} / ${problem.testCases.length} tests passed</div>
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
                    <div style="font-size: 0.8rem; font-weight: 600;">Error</div>
                    <div style="font-size: 0.6rem;">${err.message}</div>
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
                    const result = userFunction(...test.input);

                    const passed = JSON.stringify(result) === JSON.stringify(test.expected);
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
                        <div style="font-size: 0.8rem; font-weight: 600;">${allPassed ? 'All Tests Passed! 🎉' : (passedTests > 0 ? 'Some Tests Failed' : 'All Tests Failed')}</div>
                        <div style="font-size: 0.6rem;">${passedTests} / ${problem.testCases.length} tests passed</div>
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
                        <div style="font-size: 0.8rem; font-weight: 600;">Syntax Error</div>
                        <div style="font-size: 0.6rem;">${err.message}</div>
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

// Close modal when clicking outside
document.getElementById('playgroundModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'playgroundModal') closePlayground();
});