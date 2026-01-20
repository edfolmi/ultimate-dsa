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

const problemData = {
    problem1: {
        title: '1. Implement Queue using Stacks',
        description: 'Implement a queue using only two stacks',
        javascript: {
            starter: `class MyQueue {\n    constructor() {\n        // Initialize your data structure here\n    }\n    \n    enqueue(x) {\n        // Push element x to back of queue\n    }\n    \n    dequeue() {\n        // Remove and return front element\n    }\n    \n    peek() {\n        // Get the front element\n    }\n    \n    empty() {\n        // Return whether queue is empty\n    }\n}`,
            testCases: [
                {
                    input: [["MyQueue", "enqueue", "enqueue", "peek", "dequeue", "empty"], [[], [1], [2], [], [], []]],
                    expected: [null, null, null, 1, 1, false],
                    desc: 'Operations: enqueue(1), enqueue(2), peek(), dequeue(), empty()'
                },
                {
                    input: [["MyQueue", "enqueue", "enqueue", "enqueue", "dequeue", "dequeue", "dequeue", "empty"], [[], [5], [10], [15], [], [], [], []]],
                    expected: [null, null, null, null, 5, 10, 15, true],
                    desc: 'Operations: enqueue(5), enqueue(10), enqueue(15), dequeue(), dequeue(), dequeue(), empty()'
                },
            ]
        },
        python: {
            starter: `class MyQueue:\n    def __init__(self):\n        # Initialize your data structure here\n        pass\n    \n    def enqueue(self, x):\n        # Push element x to back of queue\n        pass\n    \n    def dequeue(self):\n        # Remove and return front element\n        pass\n    \n    def peek(self):\n        # Get the front element\n        pass\n    \n    def empty(self):\n        # Return whether queue is empty\n        pass`,
            testCases: [
                {
                    input: [["MyQueue", "enqueue", "enqueue", "peek", "dequeue", "empty"], [[], [1], [2], [], [], []]],
                    expected: [null, null, null, 1, 1, false],
                    desc: 'Operations: enqueue(1), enqueue(2), peek(), dequeue(), empty()'
                },
                {
                    input: [["MyQueue", "enqueue", "enqueue", "enqueue", "dequeue", "dequeue", "dequeue", "empty"], [[], [5], [10], [15], [], [], [], []]],
                    expected: [null, null, null, null, 5, 10, 15, true],
                    desc: 'Operations: enqueue(5), enqueue(10), enqueue(15), dequeue(), dequeue(), dequeue(), empty()'
                },
            ]
        },
        java: {
            starter: `class MyQueue {\n    public MyQueue() {\n        \n    }\n    \n    public void enqueue(int x) {\n        \n    }\n    \n    public int dequeue() {\n        return 0;\n    }\n    \n    public int peek() {\n        return 0;\n    }\n    \n    public boolean empty() {\n        return true;\n    }\n}`,
            testCases: []
        },
        cpp: {
            starter: `class MyQueue {\npublic:\n    MyQueue() {\n        \n    }\n    \n    void enqueue(int x) {\n        \n    }\n    \n    int dequeue() {\n        return 0;\n    }\n    \n    int peek() {\n        return 0;\n    }\n    \n    bool empty() {\n        return true;\n    }\n};`,
            testCases: []
        }
    },
    problem2: {
        title: '2. Design Circular Queue',
        description: 'Design a circular queue with fixed size',
        javascript: {
            starter: `class MyCircularQueue {\n    constructor(k) {\n        // Initialize with size k\n    }\n    \n    enQueue(value) {\n        // Insert element at rear\n        // Return true if successful\n    }\n    \n    deQueue() {\n        // Delete element from front\n        // Return true if successful\n    }\n    \n    Front() {\n        // Get front element\n        // Return -1 if empty\n    }\n    \n    Rear() {\n        // Get rear element\n        // Return -1 if empty\n    }\n    \n    isEmpty() {\n        // Check if queue is empty\n    }\n    \n    isFull() {\n        // Check if queue is full\n    }\n}`,
            testCases: [
                {
                    input: [["MyCircularQueue", "enQueue", "enQueue", "enQueue", "enQueue", "Rear", "isFull", "deQueue", "enQueue", "Rear"], [[3], [1], [2], [3], [4], [], [], [], [4], []]],
                    expected: [null, true, true, true, false, 3, true, true, true, 4],
                    desc: 'Circular queue with size 3'
                },
            ]
        },
        python: {
            starter: `class MyCircularQueue:\n    def __init__(self, k):\n        # Initialize with size k\n        pass\n    \n    def en_queue(self, value):\n        # Insert element at rear\n        # Return True if successful\n        pass\n    \n    def de_queue(self):\n        # Delete element from front\n        # Return True if successful\n        pass\n    \n    def front(self):\n        # Get front element\n        # Return -1 if empty\n        pass\n    \n    def rear(self):\n        # Get rear element\n        # Return -1 if empty\n        pass\n    \n    def is_empty(self):\n        # Check if queue is empty\n        pass\n    \n    def is_full(self):\n        # Check if queue is full\n        pass`,
            testCases: [
                {
                    input: [["MyCircularQueue", "en_queue", "en_queue", "en_queue", "en_queue", "rear", "is_full", "de_queue", "en_queue", "rear"], [[3], [1], [2], [3], [4], [], [], [], [4], []]],
                    expected: [null, true, true, true, false, 3, true, true, true, 4],
                    desc: 'Circular queue with size 3'
                },
            ]
        },
        java: {
            starter: `class MyCircularQueue {\n    public MyCircularQueue(int k) {\n        \n    }\n    \n    public boolean enQueue(int value) {\n        return false;\n    }\n    \n    public boolean deQueue() {\n        return false;\n    }\n    \n    public int Front() {\n        return -1;\n    }\n    \n    public int Rear() {\n        return -1;\n    }\n    \n    public boolean isEmpty() {\n        return true;\n    }\n    \n    public boolean isFull() {\n        return false;\n    }\n}`,
            testCases: []
        },
        cpp: {
            starter: `class MyCircularQueue {\npublic:\n    MyCircularQueue(int k) {\n        \n    }\n    \n    bool enQueue(int value) {\n        return false;\n    }\n    \n    bool deQueue() {\n        return false;\n    }\n    \n    int Front() {\n        return -1;\n    }\n    \n    int Rear() {\n        return -1;\n    }\n    \n    bool isEmpty() {\n        return true;\n    }\n    \n    bool isFull() {\n        return false;\n    }\n};`,
            testCases: []
        }
    },
    problem3: {
        title: '3. Sliding Window Maximum',
        description: 'Find maximum in each sliding window using deque',
        javascript: {
            starter: `function maxSlidingWindow(nums, k) {\n    // Write your code here\n    \n}`,
            testCases: [
                { input: [[1, 3, -1, -3, 5, 3, 6, 7], 3], expected: [3, 3, 5, 5, 6, 7], desc: 'nums = [1,3,-1,-3,5,3,6,7], k = 3' },
                { input: [[1], 1], expected: [1], desc: 'nums = [1], k = 1' },
                { input: [[1, -1], 1], expected: [1, -1], desc: 'nums = [1,-1], k = 1' },
                { input: [[9, 11], 2], expected: [11], desc: 'nums = [9,11], k = 2' },
            ]
        },
        python: {
            starter: `def max_sliding_window(nums, k):\n    # Write your code here\n    pass`,
            testCases: [
                { input: [[1, 3, -1, -3, 5, 3, 6, 7], 3], expected: [3, 3, 5, 5, 6, 7], desc: 'nums = [1,3,-1,-3,5,3,6,7], k = 3' },
                { input: [[1], 1], expected: [1], desc: 'nums = [1], k = 1' },
                { input: [[1, -1], 1], expected: [1, -1], desc: 'nums = [1,-1], k = 1' },
                { input: [[9, 11], 2], expected: [11], desc: 'nums = [9,11], k = 2' },
            ]
        },
        java: {
            starter: `public int[] maxSlidingWindow(int[] nums, int k) {\n    // Write your code here\n    return new int[0];\n}`,
            testCases: []
        },
        cpp: {
            starter: `vector<int> maxSlidingWindow(vector<int>& nums, int k) {\n    // Write your code here\n    return {};\n}`,
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

                if (currentProblem === 'problem1' || currentProblem === 'problem2') {
                    // Class-based test (MyQueue or MyCircularQueue)
                    const operations = test.input[0];
                    const values = test.input[1];

                    testCode = `
${code}
results = []
obj = None
for i, op in enumerate(${JSON.stringify(operations)}):
    val = ${JSON.stringify(values)}[i]
    if op == "MyQueue":
        obj = MyQueue()
        results.append(None)
    elif op == "MyCircularQueue":
        obj = MyCircularQueue(val[0])
        results.append(None)
    elif op == "enqueue":
        obj.enqueue(val[0])
        results.append(None)
    elif op == "dequeue":
        results.append(obj.dequeue())
    elif op == "peek":
        results.append(obj.peek())
    elif op == "empty":
        results.append(obj.empty())
    elif op == "en_queue":
        results.append(obj.en_queue(val[0]))
    elif op == "de_queue":
        results.append(obj.de_queue())
    elif op == "front":
        results.append(obj.front())
    elif op == "rear":
        results.append(obj.rear())
    elif op == "is_empty":
        results.append(obj.is_empty())
    elif op == "is_full":
        results.append(obj.is_full())
result = results
`;
                } else {
                    // maxSlidingWindow function test
                    testCode = `
${code}
result = max_sliding_window(${JSON.stringify(test.input[0])}, ${test.input[1]})
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

            if (currentProblem === 'problem1' || currentProblem === 'problem2') {
                // Class-based test (MyQueue or MyCircularQueue)
                const TestClass = new Function('return ' + code)();

                problem.testCases.forEach((test, index) => {
                    try {
                        const operations = test.input[0];
                        const values = test.input[1];
                        const results = [];
                        let obj = null;

                        for (let i = 0; i < operations.length; i++) {
                            const op = operations[i];
                            const val = values[i];

                            if (op === 'MyQueue') {
                                obj = new TestClass();
                                results.push(null);
                            } else if (op === 'MyCircularQueue') {
                                obj = new TestClass(val[0]);
                                results.push(null);
                            } else if (op === 'enqueue') {
                                obj.enqueue(val[0]);
                                results.push(null);
                            } else if (op === 'dequeue') {
                                results.push(obj.dequeue());
                            } else if (op === 'peek') {
                                results.push(obj.peek());
                            } else if (op === 'empty') {
                                results.push(obj.empty());
                            } else if (op === 'enQueue') {
                                results.push(obj.enQueue(val[0]));
                            } else if (op === 'deQueue') {
                                results.push(obj.deQueue());
                            } else if (op === 'Front') {
                                results.push(obj.Front());
                            } else if (op === 'Rear') {
                                results.push(obj.Rear());
                            } else if (op === 'isEmpty') {
                                results.push(obj.isEmpty());
                            } else if (op === 'isFull') {
                                results.push(obj.isFull());
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
                // Function test (maxSlidingWindow)
                const userFunction = new Function('return ' + code)();

                problem.testCases.forEach((test, index) => {
                    try {
                        const result = userFunction(test.input[0], test.input[1]);
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