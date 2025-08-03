const algorithmDetails = {
  bubble: { name: 'Bubble Sort', time: 'O(n²)', space: 'O(1)' },
  selection: { name: 'Selection Sort', time: 'O(n²)', space: 'O(1)' },
  insertion: { name: 'Insertion Sort', time: 'O(n²)', space: 'O(1)' },
  merge: { name: 'Merge Sort', time: 'O(n log n)', space: 'O(n)' },
  quick: { name: 'Quick Sort', time: 'O(n log n)', space: 'O(log n)' }
};

function updateAlgorithmInfo() {
  const algo = document.getElementById('algorithm').value;
  const { name, time, space } = algorithmDetails[algo];
  document.getElementById('algoName').textContent = name;
  document.getElementById('timeComp').textContent = time;
  document.getElementById('spaceComp').textContent = space;
}

function generateRandom() {
  const arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
  document.getElementById('arrayInput').value = arr.join(',');
  renderBars(arr);
}

function renderBars(arr) {
  const bars = document.getElementById('barsContainer');
  bars.innerHTML = '';
  const max = Math.max(...arr);
  arr.forEach(val => {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = `${(val / max) * 100}%`;
    bars.appendChild(bar);
  });
}

// Sorting Algorithms Visuals
async function bubbleSortVisual(arr) {
  const bars = document.getElementById('barsContainer').children;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      bars[j].style.backgroundColor = '#f97316';
      bars[j + 1].style.backgroundColor = '#f97316';

      if (arr[j] > arr[j + 1]) {
        await new Promise(r => setTimeout(r, 300));
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        renderBars(arr);
      }

      bars[j].style.backgroundColor = '#38bdf8';
      bars[j + 1].style.backgroundColor = '#38bdf8';
    }
  }
}

async function selectionSortVisual(arr) {
  const bars = document.getElementById('barsContainer').children;
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    bars[i].style.backgroundColor = '#f59e0b';
    for (let j = i + 1; j < arr.length; j++) {
      bars[j].style.backgroundColor = '#f97316';
      if (arr[j] < arr[minIdx]) minIdx = j;
      await new Promise(r => setTimeout(r, 200));
      bars[j].style.backgroundColor = '#38bdf8';
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    renderBars(arr);
    bars[i].style.backgroundColor = '#10b981';
  }
}

async function insertionSortVisual(arr) {
  const bars = document.getElementById('barsContainer').children;
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
      await new Promise(r => setTimeout(r, 200));
      renderBars(arr);
    }
    arr[j + 1] = key;
    renderBars(arr);
    bars[i].style.backgroundColor = '#10b981';
  }
}

async function mergeSortVisual(arr) {
  async function merge(arr, l, m, r) {
    let left = arr.slice(l, m + 1);
    let right = arr.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
      await new Promise(r => setTimeout(r, 300));
      if (left[i] <= right[j]) {
        arr[k++] = left[i++];
      } else {
        arr[k++] = right[j++];
      }
      renderBars(arr);
    }
    while (i < left.length) arr[k++] = left[i++];
    while (j < right.length) arr[k++] = right[j++];
    renderBars(arr);
  }

  async function mergeSort(arr, l, r) {
    if (l < r) {
      const m = Math.floor((l + r) / 2);
      await mergeSort(arr, l, m);
      await mergeSort(arr, m + 1, r);
      await merge(arr, l, m, r);
    }
  }

  await mergeSort(arr, 0, arr.length - 1);
}

async function quickSortVisual(arr) {
  async function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        await new Promise(r => setTimeout(r, 300));
        renderBars(arr);
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    renderBars(arr);
    return i + 1;
  }

  async function quickSort(arr, low, high) {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
  }

  await quickSort(arr, 0, arr.length - 1);
}

// Main
function startSorting() {
  const input = document.getElementById('arrayInput').value;
  const algo = document.getElementById('algorithm').value;
  const arr = input.split(',').map(Number);
  renderBars(arr);

  switch (algo) {
    case 'bubble': bubbleSortVisual(arr); break;
    case 'selection': selectionSortVisual(arr); break;
    case 'insertion': insertionSortVisual(arr); break;
    case 'merge': mergeSortVisual(arr); break;
    case 'quick': quickSortVisual(arr); break;
  }
}

// Initial setup
renderBars([64, 34, 25, 12, 22, 11, 90]);
updateAlgorithmInfo();
document.getElementById('algorithm').addEventListener('change', updateAlgorithmInfo);
