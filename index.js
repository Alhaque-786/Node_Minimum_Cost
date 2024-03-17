const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const stocks = {
    'C1': {'A': 3, 'B': 2, 'C': 8},
    'C2': {'D': 12, 'E': 25, 'F': 15},
    'C3': {'G': 0.5, 'H': 1, 'I': 2},
};

const graph = {
    'C1': {'C2': 4, 'L1': 3},
    'C2': {'C1': 4, 'C3': 3, 'L1': 2.5},
    'C3': {'C2': 3, 'L1': 2},
    'L1': {'C1': 3, 'C2': 2.5, 'C3': 2}
};

function initializeWeights(data, stocks) {
    const weights = {'C1': 0, 'C2': 0, 'C3': 0, 'L1': 0};
    for (const prod in data) {
        if (['A', 'B', 'C'].includes(prod)) {
            weights['C1'] += data[prod] * stocks['C1'][prod];
        } else if (['D', 'E', 'F'].includes(prod)) {
            weights['C2'] += data[prod] * stocks['C2'][prod];
        } else if (['G', 'H', 'I'].includes(prod)) {
            weights['C3'] += data[prod] * stocks['C3'][prod];
        }
    }
    return weights;
}

function getCost(weight, distance) {
    return (10 + 8 * Math.floor(weight / 5)) * distance;
}

function minCost(weights) {
    let minCost = [Infinity];
    let n = 0;
    for (const c in weights) {
        if (weights[c]) {
            n += 1;
        }
    }

    const visited = new Set();

    function backtrack(u, prevWeight, totalCost) {
        if (totalCost >= minCost[0]) {
            return;
        }

        if (!Object.values(weights).some(weight => weight !== 0)) {
            minCost[0] = Math.min(minCost[0], totalCost);
            return;
        }

        if (u !== 'L1') {
            visited.add(u);
            prevWeight += weights[u];
        } else {
            prevWeight = 0;
        }

        const temp = weights[u];
        weights[u] = 0;

        for (const neigh in graph[u]) {
            if (neigh === 'L1' || (weights[neigh] !== 0 && !visited.has(neigh))) {
                backtrack(neigh, prevWeight, totalCost + getCost(prevWeight, graph[u][neigh]));
            }
        }

        if (u !== 'L1') visited.delete(u);
        weights[u] = temp;
    }

    for (const u in stocks) {
        backtrack(u, 0, 0);
    }
    return minCost[0];
}

app.post('/calculate_cost', (req, res) => {
    const data = req.body;

    if (!data) {
        return res.status(400).json({'error': 'Missing data'});
    }

    const weights = initializeWeights(data, stocks);
    const result = minCost(weights);
    return res.json({'minimum_cost': result});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
