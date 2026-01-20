// heaps.js
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
        title: '1. Kth Largest Element',
        description: 'Find the kth largest element in an unsorted array using a min heap.',
        javascript: {
            starter: `function findKthLargest(nums, k) {\n    // Write your code here\n    \n}`,
            testCases: [
                { input: [[3, 2, 1, 5, 6, 4], 2], expected: 5, desc: '[3,2,1,5,6,4], k=2' },
                { input: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], expected: 4, desc: '[3,2,3,1,2,4,5,5,6], k=4' },
                { input: [[1], 1], expected: 1, desc: '[1], k=1' },
            ]
        },
        python: {
            starter: `def find_kth_largest(nums, k):\n    # Write your code here\n    pass`,
            testCases: [
                { input: [[3, 2, 1, 5, 6, 4], 2], expected: 5, desc: '[3,2,1,5,6,4], k=2' },
                { input: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], expected: 4, desc: '[3,2,3,1,2,4,5,5,6], k=4' },
                { input: [[1], 1], expected: 1, desc: '[1], k=1' },
            ]
        },
        java: {
            starter: `public int findKthLargest(int[] nums, int k) {\n    // Write your code here\n    return 0;\n}`,
            testCases: []
        },
        cpp: {
            starter: `int findKthLargest(vector<int>& nums, int k) {\n    // Write your code here\n    return 0;\n}`,
            testCases: []
        }
    },
    problem2: {
        title: '2. Merge K Sorted Lists',
        description: 'Merge k sorted linked lists using a min heap.',
        javascript: {
            starter: `function mergeKLists(lists) {\n    // Write your code here\n    \n}`,
            testCases: [
                { input: [[[1,4,5],[1,3,4],[2,6]]], expected: [1,1,2,3,4,4,5,6], desc: '[[1,4,5],[1,3,4],[2,6]]' },
                { input: [[]], expected: [], desc: '[]' },
                { input: [[[]]], expected: [], desc: '[[]]' },
            ]
        },
        python: {
            starter: `def merge_k_lists(lists):\n    # Write your code here\n    pass`,
            testCases: [
                { input: [[[1,4,5],[1,3,4],[2,6]]], expected: [1,1,2,3,4,4,5,6], desc: '[[1,4,5],[1,3,4],[2,6]]' },
                { input: [[]], expected: [], desc: '[]' },
                { input: [[[]]], expected: [], desc: '[[]]' },
            ]
        },
        java: {
            starter: `public ListNode mergeKLists(ListNode[] lists) {\n    // Write your code here\n    return null;\n}`,
            testCases: []
        },
        cpp: {
            starter: `ListNode* mergeKLists(vector<ListNode*>& lists) {\n    // Write your code here\n    return nullptr;\n}`,
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

// Helper to create linked list from array
function createList(arr) {
    if (!arr || arr.length === 0) return null;
    const head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

// Helper to convert linked list to array
function listToArray(head) {
    const result = [];
    let current = head;
    while (current !== null) {
        result.push(current.val);
        current = current.next;
    }
    return result;
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
                let testCode;
                if (currentProblem === 'problem2') {
                    // Merge K Lists
                    testCode = `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def build_list(arr):
    if not arr:
        return None
    head = ListNode(arr[0])
    current = head
    for val in arr[1:]:
        current.next = ListNode(val)
        current = current.next
    return head

${code}
lists = [build_list(sublist) for sublist in ${JSON.stringify(test.input[0])}]
merged = merge_k_lists(lists)
result = []
current = merged
while current:
    result.append(current.val)
    current = current.next
`;
                } else {
                    // Kth Largest
                    testCode = `
${code}
result = find_kth_largest(${JSON.stringify(test.input[0])}, ${test.input[1]})
`;
                }

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
            // Execute the code to define any classes/functions
            eval(code);
            
            // Get the function reference based on problem
            let userFunction;
            if (currentProblem === 'problem1') {
                userFunction = findKthLargest;
            } else if (currentProblem === 'problem2') {
                userFunction = mergeKLists;
            }
            
            let passedTests = 0;
            let resultsHTML = '';

            problem.testCases.forEach((test, index) => {
                try {
                    let result;
                    if (currentProblem === 'problem2') {
                        const lists = test.input[0].map(createList);
                        const merged = userFunction(lists);
                        result = listToArray(merged);
                    } else {
                        result = userFunction(test.input[0], test.input[1]);
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

// ListNode class for JS
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
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