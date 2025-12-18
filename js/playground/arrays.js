let pyodideReadyPromise = null;
let pyodideInstance = null;
let currentProblem = null;
let currentLanguage = 'javascript';

// Initialize Pyodide on first use
async function initPyodide() {
    if (!pyodideReadyPromise) {
        pyodideReadyPromise = loadPyodide();
        pyodideInstance = await pyodideReadyPromise;
    }
    return pyodideInstance;
}

const problemData = {
    problem1: {
        title: '1. Two Sum',
        description: 'Return indices of two numbers that add up to target',
        javascript: {
            starter: `function twoSum(nums, target) {\n    // Write your code here\n    \n}`,
            testCases: [
                { input: [[2, 7, 11, 15], 9], expected: [0, 1], desc: '[2,7,11,15], target=9' },
                { input: [[3, 2, 4], 6], expected: [1, 2], desc: '[3,2,4], target=6' },
                { input: [[3, 3], 6], expected: [0, 1], desc: '[3,3], target=6' },
            ]
        },
        python: {
            starter: `def two_sum(nums, target):\n    # Write your code here\n    pass`,
            testCases: [
                { input: [[2, 7, 11, 15], 9], expected: [0, 1], desc: '[2,7,11,15], target=9' },
                { input: [[3, 2, 4], 6], expected: [1, 2], desc: '[3,2,4], target=6' },
                { input: [[3, 3], 6], expected: [0, 1], desc: '[3,3], target=6' },
            ]
        },
        java: {
            starter: `public int[] twoSum(int[] nums, int target) {\n    // Write your code here\n    return new int[0];\n}`,
            testCases: []
        },
        cpp: {
            starter: `vector<int> twoSum(vector<int>& nums, int target) {\n    // Write your code here\n    return {};\n}`,
            testCases: []
        }
    },
    problem2: {
        title: '2. Maximum Subarray',
        description: 'Find the contiguous subarray with the largest sum',
        javascript: {
            starter: `function maxSubArray(nums) {\n    // Write your code here\n    \n}`,
            testCases: [
                { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6, desc: '[-2,1,-3,4,-1,2,1,-5,4]' },
                { input: [[1]], expected: 1, desc: '[1]' },
                { input: [[5, 4, -1, 7, 8]], expected: 23, desc: '[5,4,-1,7,8]' },
            ]
        },
        python: {
            starter: `def max_sub_array(nums):\n    # Write your code here\n    pass`,
            testCases: [
                { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6, desc: '[-2,1,-3,4,-1,2,1,-5,4]' },
                { input: [[1]], expected: 1, desc: '[1]' },
                { input: [[5, 4, -1, 7, 8]], expected: 23, desc: '[5,4,-1,7,8]' },
            ]
        },
        java: {
            starter: `public int maxSubArray(int[] nums) {\n    // Write your code here\n    return 0;\n}`,
            testCases: []
        },
        cpp: {
            starter: `int maxSubArray(vector<int>& nums) {\n    // Write your code here\n    return 0;\n}`,
            testCases: []
        }
    },
    problem3: {
        title: '3. Rotate Array',
        description: 'Rotate array to the right by k steps',
        javascript: {
            starter: `function rotate(nums, k) {\n    // Modify nums in-place\n    \n}`,
            testCases: [
                { input: [[1, 2, 3, 4, 5, 6, 7], 3], expected: [5, 6, 7, 1, 2, 3, 4], desc: '[1,2,3,4,5,6,7], k=3' },
                { input: [[-1, -100, 3, 99], 2], expected: [3, 99, -1, -100], desc: '[-1,-100,3,99], k=2' },
            ]
        },
        python: {
            starter: `def rotate(nums, k):\n    # Modify nums in-place\n    pass`,
            testCases: [
                { input: [[1, 2, 3, 4, 5, 6, 7], 3], expected: [5, 6, 7, 1, 2, 3, 4], desc: '[1,2,3,4,5,6,7], k=3' },
                { input: [[-1, -100, 3, 99], 2], expected: [3, 99, -1, -100], desc: '[-1,-100,3,99], k=2' },
            ]
        },
        java: {
            starter: `public void rotate(int[] nums, int k) {\n    // Modify nums in-place\n}`,
            testCases: []
        },
        cpp: {
            starter: `void rotate(vector<int>& nums, int k) {\n    // Modify nums in-place\n}`,
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
    document.getElementById('codeEditor').value = problem.starter;
}

function openPlayground(problemId) {
    currentProblem = problemId;
    currentLanguage = 'javascript';
    const problem = problemData[problemId];

    document.getElementById('playgroundTitle').textContent = problem.title;
    document.getElementById('playgroundDescription').textContent = problem.description;
    document.getElementById('codeEditor').value = problem.javascript.starter;

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === 'javascript');
    });

    document.getElementById('testResults').innerHTML = '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #a3a3a3;"><p>Run tests to see results</p></div>';

    document.getElementById('playgroundModal').classList.add('show');
}

function closePlayground() {
    document.getElementById('playgroundModal').classList.remove('show');
}

function resetCode() {
    const problem = problemData[currentProblem][currentLanguage];
    document.getElementById('codeEditor').value = problem.starter;
}

async function runPythonTests() {
    const code = document.getElementById('codeEditor').value;
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
                let testCode;
                if (currentProblem === 'problem3') {
                    // For in-place modification
                    testCode = `
${code}
nums = ${JSON.stringify(test.input[0])}
rotate(nums, ${test.input[1]})
result = nums
`;
                } else {
                    testCode = `
${code}
result = ${currentProblem === 'problem1' ? 'two_sum' : 'max_sub_array'}(${JSON.stringify(test.input[0])}${test.input.length > 1 ? ', ' + test.input[1] : ''})
`;
                }

                await pyodide.runPythonAsync(testCode);
                let result = pyodide.globals.get('result').toJs();

                // Convert to regular array if needed
                if (result && typeof result === 'object' && result[Symbol.iterator]) {
                    result = Array.from(result);
                }

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
                    <div style="font-size: 1.1rem; font-weight: 600;">${allPassed ? 'All Tests Passed! 🎉' : (passedTests > 0 ? 'Some Tests Failed' : 'All Tests Failed')}</div>
                    <div style="font-size: 0.9rem;">${passedTests} / ${problem.testCases.length} tests passed</div>
                </div>
            </div>
            ${resultsHTML}
        `;
        resultsDiv.innerHTML = resultsHTML;
    } catch (err) {
        resultsDiv.innerHTML = `
            <div class="test-summary error">
                <div>
                    <div style="font-size: 1.1rem; font-weight: 600;">Error</div>
                    <div style="font-size: 0.9rem;">${err.message}</div>
                </div>
            </div>
        `;
    }
}

async function runJavaScriptTests() {
    const code = document.getElementById('codeEditor').value;
    const problem = problemData[currentProblem][currentLanguage];
    const resultsDiv = document.getElementById('testResults');

    resultsDiv.innerHTML = '<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 1rem;"><div class="spinner"></div><p style="color: #a3a3a3;">Running tests...</p></div>';

    setTimeout(() => {
        try {
            const userFunction = new Function('return ' + code)();
            let passedTests = 0;
            let resultsHTML = '';

            problem.testCases.forEach((test, index) => {
                try {
                    let result;
                    if (currentProblem === 'problem3') {
                        const numsCopy = [...test.input[0]];
                        userFunction(numsCopy, test.input[1]);
                        result = numsCopy;
                    } else {
                        result = userFunction(...test.input);
                    }

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
                        <div style="font-size: 1.1rem; font-weight: 600;">${allPassed ? 'All Tests Passed! 🎉' : (passedTests > 0 ? 'Some Tests Failed' : 'All Tests Failed')}</div>
                        <div style="font-size: 0.9rem;">${passedTests} / ${problem.testCases.length} tests passed</div>
                    </div>
                </div>
                ${resultsHTML}
            `;
            resultsDiv.innerHTML = resultsHTML;
        } catch (err) {
            resultsDiv.innerHTML = `
                <div class="test-summary error">
                    <div>
                        <div style="font-size: 1.1rem; font-weight: 600;">Syntax Error</div>
                        <div style="font-size: 0.9rem;">${err.message}</div>
                    </div>
                </div>
            `;
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