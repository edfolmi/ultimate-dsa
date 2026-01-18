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
        title: '1. Valid Parentheses',
        description: 'Determine if the input string has valid brackets',
        javascript: {
            starter: `function isValid(s) {\n    // Write your code here\n    \n}`,
            testCases: [
                { input: ["()"], expected: true, desc: 's = "()"' },
                { input: ["()[]{}"], expected: true, desc: 's = "()[]{}"' },
                { input: ["(]"], expected: false, desc: 's = "(]"' },
                { input: ["([)]"], expected: false, desc: 's = "([)]"' },
                { input: ["{[]}"], expected: true, desc: 's = "{[]}"' },
            ]
        },
        python: {
            starter: `def is_valid(s):\n    # Write your code here\n    pass`,
            testCases: [
                { input: ["()"], expected: true, desc: 's = "()"' },
                { input: ["()[]{}"], expected: true, desc: 's = "()[]{}"' },
                { input: ["(]"], expected: false, desc: 's = "(]"' },
                { input: ["([)]"], expected: false, desc: 's = "([)]"' },
                { input: ["{[]}"], expected: true, desc: 's = "{[]}"' },
            ]
        },
        java: {
            starter: `public boolean isValid(String s) {\n    // Write your code here\n    return false;\n}`,
            testCases: []
        },
        cpp: {
            starter: `bool isValid(string s) {\n    // Write your code here\n    return false;\n}`,
            testCases: []
        }
    },
    problem2: {
        title: '2. Min Stack',
        description: 'Design a stack with O(1) minimum retrieval',
        javascript: {
            starter: `class MinStack {\n    constructor() {\n        // Initialize your data structure here\n    }\n    \n    push(val) {\n        // Push element val onto stack\n    }\n    \n    pop() {\n        // Remove the element on top of the stack\n    }\n    \n    top() {\n        // Get the top element\n    }\n    \n    getMin() {\n        // Retrieve the minimum element in O(1)\n    }\n}`,
            testCases: [
                {
                    input: [["MinStack", "push", "push", "push", "getMin", "pop", "top", "getMin"], [[], [-2], [0], [-3], [], [], [], []]],
                    expected: [null, null, null, null, -3, null, 0, -2],
                    desc: 'Operations: push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()'
                },
                {
                    input: [["MinStack", "push", "push", "getMin", "getMin", "push", "getMin"], [[], [1], [2], [], [], [0], []]],
                    expected: [null, null, null, 1, 1, null, 0],
                    desc: 'Operations: push(1), push(2), getMin(), getMin(), push(0), getMin()'
                },
            ]
        },
        python: {
            starter: `class MinStack:\n    def __init__(self):\n        # Initialize your data structure here\n        pass\n    \n    def push(self, val):\n        # Push element val onto stack\n        pass\n    \n    def pop(self):\n        # Remove the element on top\n        pass\n    \n    def top(self):\n        # Get the top element\n        pass\n    \n    def get_min(self):\n        # Retrieve the minimum element in O(1)\n        pass`,
            testCases: [
                {
                    input: [["MinStack", "push", "push", "push", "get_min", "pop", "top", "get_min"], [[], [-2], [0], [-3], [], [], [], []]],
                    expected: [null, null, null, null, -3, null, 0, -2],
                    desc: 'Operations: push(-2), push(0), push(-3), get_min(), pop(), top(), get_min()'
                },
                {
                    input: [["MinStack", "push", "push", "get_min", "get_min", "push", "get_min"], [[], [1], [2], [], [], [0], []]],
                    expected: [null, null, null, 1, 1, null, 0],
                    desc: 'Operations: push(1), push(2), get_min(), get_min(), push(0), get_min()'
                },
            ]
        },
        java: {
            starter: `class MinStack {\n    public MinStack() {\n        // Initialize\n    }\n    \n    public void push(int val) {\n        \n    }\n    \n    public void pop() {\n        \n    }\n    \n    public int top() {\n        return 0;\n    }\n    \n    public int getMin() {\n        return 0;\n    }\n}`,
            testCases: []
        },
        cpp: {
            starter: `class MinStack {\npublic:\n    MinStack() {\n        \n    }\n    \n    void push(int val) {\n        \n    }\n    \n    void pop() {\n        \n    }\n    \n    int top() {\n        return 0;\n    }\n    \n    int getMin() {\n        return 0;\n    }\n};`,
            testCases: []
        }
    },
    problem3: {
        title: '3. Evaluate Reverse Polish Notation',
        description: 'Evaluate arithmetic expression in RPN',
        javascript: {
            starter: `function evalRPN(tokens) {\n    // Write your code here\n    \n}`,
            testCases: [
                { input: [["2", "1", "+", "3", "*"]], expected: 9, desc: 'tokens = ["2","1","+","3","*"]' },
                { input: [["4", "13", "5", "/", "+"]], expected: 6, desc: 'tokens = ["4","13","5","/","+"]' },
                { input: [["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]], expected: 22, desc: 'tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]' },
            ]
        },
        python: {
            starter: `def eval_rpn(tokens):\n    # Write your code here\n    pass`,
            testCases: [
                { input: [["2", "1", "+", "3", "*"]], expected: 9, desc: 'tokens = ["2","1","+","3","*"]' },
                { input: [["4", "13", "5", "/", "+"]], expected: 6, desc: 'tokens = ["4","13","5","/","+"]' },
                { input: [["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]], expected: 22, desc: 'tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]' },
            ]
        },
        java: {
            starter: `public int evalRPN(String[] tokens) {\n    // Write your code here\n    return 0;\n}`,
            testCases: []
        },
        cpp: {
            starter: `int evalRPN(vector<string>& tokens) {\n    // Write your code here\n    return 0;\n}`,
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
                let testCode;

                if (currentProblem === 'problem2') {
                    // MinStack test
                    const operations = test.input[0];
                    const values = test.input[1];

                    testCode = `
${code}
results = []
obj = None
for i, op in enumerate(${JSON.stringify(operations)}):
    val = ${JSON.stringify(values)}[i]
    if op == "MinStack":
        obj = MinStack()
        results.append(None)
    elif op == "push":
        obj.push(val[0])
        results.append(None)
    elif op == "pop":
        obj.pop()
        results.append(None)
    elif op == "top":
        results.append(obj.top())
    elif op == "get_min":
        results.append(obj.get_min())
result = results
`;
                } else {
                    const funcName = currentProblem === 'problem1' ? 'is_valid' : 'eval_rpn';
                    testCode = `
${code}
result = ${funcName}(${JSON.stringify(test.input[0])})
`;
                }

                await pyodide.runPythonAsync(testCode);
                let result = pyodide.globals.get('result');

                if (result && typeof result === 'object' && result.toJs) {
                    result = result.toJs();
                    if (result && typeof result === 'object' && result[Symbol.iterator]) {
                        result = Array.from(result);
                    }
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

        // Smooth auto-scroll to top
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
            let passedTests = 0;
            let resultsHTML = '';

            if (currentProblem === 'problem2') {
                // MinStack test
                const MinStack = new Function('return ' + code)();

                problem.testCases.forEach((test, index) => {
                    try {
                        const operations = test.input[0];
                        const values = test.input[1];
                        const results = [];
                        let obj = null;

                        for (let i = 0; i < operations.length; i++) {
                            const op = operations[i];
                            const val = values[i];

                            if (op === 'MinStack') {
                                obj = new MinStack();
                                results.push(null);
                            } else if (op === 'push') {
                                obj.push(val[0]);
                                results.push(null);
                            } else if (op === 'pop') {
                                obj.pop();
                                results.push(null);
                            } else if (op === 'top') {
                                results.push(obj.top());
                            } else if (op === 'getMin') {
                                results.push(obj.getMin());
                            }
                        }

                        const passed = JSON.stringify(results) === JSON.stringify(test.expected);
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
                                            <div><strong>Got:</strong> ${JSON.stringify(results)}</div>
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
            } else {
                // Regular function test (isValid or evalRPN)
                const userFunction = new Function('return ' + code)();

                problem.testCases.forEach((test, index) => {
                    try {
                        const result = userFunction(test.input[0]);
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

            // Smooth auto-scroll to top
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

// Close modal when clicking outside
document.getElementById('playgroundModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'playgroundModal') closePlayground();
});