import json
import os

# Project root
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.makedirs(os.path.join(root, "src", "data"), exist_ok=True)
os.makedirs(os.path.join(root, "api", "_data"), exist_ok=True)

# 1. Full Stack Web Development
def solve_fswd(stdin_text):
    raw = stdin_text.split()
    if not raw:
        return ""
    n = int(raw[0])
    k = int(raw[1])
    arr = [int(x) for x in raw[2:2+n]]
    curr = sum(arr[:k])
    max_sum = curr
    for i in range(k, n):
        curr += arr[i] - arr[i - k]
        if curr > max_sum:
            max_sum = curr
    return str(max_sum)

# 2. Data Science
def solve_ds(stdin_text):
    raw = stdin_text.split()
    if not raw:
        return ""
    n = int(raw[0])
    t = int(raw[1])
    arr = [int(x) for x in raw[2:2+n]]
    diff = max(arr) - min(arr)
    status = "VOLATILE" if diff > t else "STABLE"
    return f"{status} {diff}"

# 3. Artificial Intelligence & Machine Learning (AIML)
def solve_aiml(stdin_text):
    raw = stdin_text.split()
    if not raw:
        return ""
    n = int(raw[0])
    scores = [int(x) for x in raw[1:1+n]]
    high = sum(1 for s in scores if s >= 80)
    med = sum(1 for s in scores if 50 <= s < 80)
    low = sum(1 for s in scores if s < 50)
    avg = sum(scores) / n
    return f"High: {high}, Medium: {med}, Low: {low}\nAverage: {avg:.1f}"

# 4. Python with Data Science
def solve_pyds(stdin_text):
    raw = stdin_text.split()
    if not raw:
        return ""
    n = int(raw[0])
    idx = 1
    totals = {}
    for _ in range(n):
        cid = int(raw[idx])
        amt = int(raw[idx+1])
        idx += 2
        totals[cid] = totals.get(cid, 0) + amt
    best_cid = None
    best_amt = -1
    for cid in sorted(totals.keys()):
        if totals[cid] > best_amt:
            best_amt = totals[cid]
            best_cid = cid
    return f"Customer {best_cid} spent {best_amt}"

# 5. Python with Machine Learning
def solve_pyml(stdin_text):
    raw = stdin_text.split()
    if not raw:
        return ""
    n = int(raw[0])
    t = int(raw[1])
    docks = [int(x) for x in raw[2:2+n]]
    best_dock = None
    min_dist = float('inf')
    for d in sorted(docks):
        dist = abs(d - t)
        if dist < min_dist:
            min_dist = dist
            best_dock = d
    return str(best_dock)

# 6. Data Analytics
def solve_da(stdin_text):
    raw = stdin_text.split()
    if not raw:
        return ""
    n = int(raw[0])
    arr = [int(x) for x in raw[1:1+n]]
    distinct = sorted(list(set(arr)), reverse=True)
    if len(distinct) < 2:
        return "NO RUNNER UP"
    return str(distinct[1])

# 7. App Development
def solve_ad(stdin_text):
    raw = stdin_text.split()
    if not raw:
        return ""
    n = int(raw[0])
    tags = raw[1:1+n]
    if not tags:
        return ""
    out = []
    curr_tag = tags[0]
    count = 1
    for t in tags[1:]:
        if t == curr_tag:
            count += 1
        else:
            out.append(f"{curr_tag} {count}")
            curr_tag = t
            count = 1
    out.append(f"{curr_tag} {count}")
    return " ".join(out)

# 8. Internet of Things (IOT)
def solve_iot(stdin_text):
    raw = stdin_text.split()
    if not raw:
        return ""
    n = int(raw[0])
    d = int(raw[1])
    temps = [int(x) for x in raw[2:2+n]]
    spikes = 0
    max_surge = 0
    for i in range(1, n):
        diff = temps[i] - temps[i-1]
        if diff >= d:
            spikes += 1
            if diff > max_surge:
                max_surge = diff
    if spikes == 0:
        return "0 0"
    return f"{spikes} {max_surge}"

# 9. Embedded System
def solve_es(stdin_text):
    raw = stdin_text.split()
    if not raw:
        return ""
    n = int(raw[0])
    frames = [int(x) for x in raw[1:1+n]]
    valid_count = 0
    total_sum = 0
    for f in frames:
        if bin(f).count('1') % 2 == 0:
            valid_count += 1
            total_sum += f
    if valid_count == 0:
        return "0 0"
    return f"{valid_count} {total_sum}"

starterCode = {
  "Python 3": """import sys

def main():
    # Read all tokens from standard input
    input_data = sys.stdin.read().split()
    if not input_data:
        return

    # Write your solution here
    pass

if __name__ == '__main__':
    main()
""",
  "Java": """import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNext()) {
            return;
        }

        // Write your solution here
    }
}
""",
  "C": """#include <stdio.h>

int main() {
    // Write your solution here
    return 0;
}
""",
  "C++": """#include <iostream>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Write your solution here
    return 0;
}
"""
}

questions_def = [
  {
    "course": "Full Stack Web Development",
    "id": "CODE-FSWD-01",
    "title": "API Gateway Peak Load Window",
    "scenario": "An enterprise API gateway logs the payload size (in kilobytes) of consecutive incoming HTTP requests. During traffic surges, backend engineers need to determine the maximum aggregate bandwidth processed across any continuous window of exactly K requests to configure rate-limiting buckets.",
    "inputFormat": "Line 1: Two space-separated integers N and K, where N is the total number of requests and K is the sliding window size.\nLine 2: N space-separated integers representing request payload sizes in kilobytes.",
    "outputFormat": "A single integer denoting the maximum sum of payload sizes across any contiguous block of K requests.",
    "constraints": "1 <= K <= N <= 10^5\n0 <= payload size <= 10^4",
    "explanation": "Windows of size 3:\n- [10, 20, 30] -> sum = 60\n- [20, 30, 5] -> sum = 55\n- [30, 5, 40] -> sum = 75\n- [5, 40, 15] -> sum = 60\nThe maximum sum is 75.",
    "solver": solve_fswd,
    "inputs": [
      "6 3\n10 20 30 5 40 15",
      "5 5\n100 200 300 400 500",
      "4 1\n50 10 90 20",
      "7 2\n0 0 0 0 0 0 0",
      "8 4\n12 45 23 89 67 34 91 10"
    ]
  },
  {
    "course": "Data Science",
    "id": "CODE-DS-01",
    "title": "Telemetry Sensor Stability Index",
    "scenario": "A data science team is evaluating autonomous drone sensor streams. A telemetry stream is labeled VOLATILE if the difference between its maximum and minimum readings within a mission segment strictly exceeds a stability threshold T. Otherwise, it is labeled STABLE. Given N readings and threshold T, classify the stream and output the observed range (max - min).",
    "inputFormat": "Line 1: Two space-separated integers N and T, where N is the reading count and T is the stability threshold.\nLine 2: N space-separated integers representing recorded sensor values.",
    "outputFormat": "A single line containing the classification (VOLATILE or STABLE) followed by a space and the range (max - min).",
    "constraints": "2 <= N <= 10^5\n0 <= T <= 10^6\n-10^6 <= sensor value <= 10^6",
    "explanation": "Maximum reading is 40 and minimum reading is 10. Range = 40 - 10 = 30. Since 30 > 25 (threshold T), the stream is VOLATILE 30.",
    "solver": solve_ds,
    "inputs": [
      "5 25\n10 35 15 20 40",
      "4 50\n100 100 100 100",
      "6 10\n-5 0 3 -2 5 1",
      "3 15\n-20 0 20",
      "7 100\n150 220 180 290 130 210 240"
    ]
  },
  {
    "course": "Artificial Intelligence & Machine Learning (AIML)",
    "id": "CODE-AIML-01",
    "title": "Model Confidence Discretizer",
    "scenario": "An image classification neural network emits integer confidence scores (0 to 100) for a batch of predictions. The inference pipeline categorizes each prediction into: High (>= 80), Medium (50 to 79 inclusive), or Low (< 50). Compute the frequency of each category and the overall average confidence formatted to 1 decimal place.",
    "inputFormat": "Line 1: An integer N representing the number of predictions.\nLine 2: N space-separated integers denoting confidence scores (0-100).",
    "outputFormat": "Line 1: 'High: X, Medium: Y, Low: Z' where X, Y, Z are counts.\nLine 2: 'Average: W' where W is the average formatted to 1 decimal place.",
    "constraints": "1 <= N <= 10^5\n0 <= score <= 100",
    "explanation": "High (>=80): 85, 92 -> 2\nMedium (50-79): 64, 78 -> 2\nLow (<50): 45 -> 1\nAverage = (85+92+64+45+78) / 5 = 72.8",
    "solver": solve_aiml,
    "inputs": [
      "5\n85 92 64 45 78",
      "3\n100 100 100",
      "4\n0 20 40 49",
      "6\n50 79 80 49 50 81",
      "8\n95 88 72 61 54 43 32 89"
    ]
  },
  {
    "course": "Python with Data Science",
    "id": "CODE-PYDS-01",
    "title": "Highest Grossing Customer Identifier",
    "scenario": "An online marketplace aggregates daily transaction receipts. Each transaction record lists a customer ID and the purchase amount. Calculate the cumulative spend per customer and identify the top customer. If multiple customers tie for the highest total spend, select the customer with the numerically smaller customer ID.",
    "inputFormat": "Line 1: An integer N denoting the number of transaction records.\nNext N lines: Two space-separated integers, customerId and amount.",
    "outputFormat": "A single line: 'Customer <ID> spent <Total>'",
    "constraints": "1 <= N <= 10^5\n1 <= customerId <= 10^6\n1 <= amount <= 10^5",
    "explanation": "Customer 101: 250 + 300 = 550\nCustomer 102: 400 + 100 = 500\nCustomer 103: 550\nBoth 101 and 103 spent 550. Customer 101 is chosen because 101 < 103.",
    "solver": solve_pyds,
    "inputs": [
      "5\n101 250\n102 400\n101 300\n103 550\n102 100",
      "1\n999 500",
      "4\n20 100\n10 100\n30 100\n40 50",
      "6\n5 10\n5 20\n5 30\n2 30\n2 30\n1 59",
      "7\n1001 25\n1002 50\n1003 75\n1002 50\n1001 75\n1003 25\n1004 99"
    ]
  },
  {
    "course": "Python with Machine Learning",
    "id": "CODE-PYML-01",
    "title": "Automated Depot Dispatcher",
    "scenario": "A logistics facility operates autonomous shuttles along a straight 1D track. Charging stations are situated at integer coordinates X_1, X_2, ..., X_N. When a shuttle finishes a run at position T, it must dock at the nearest charging station (minimizing |X_i - T|). If two stations are equally distant, choose the station with the smaller coordinate.",
    "inputFormat": "Line 1: Two space-separated integers N and T (dock count and shuttle position).\nLine 2: N space-separated integers representing dock coordinates.",
    "outputFormat": "A single integer denoting the coordinate of the selected charging station.",
    "constraints": "1 <= N <= 10^5\n-10^6 <= T, X_i <= 10^6",
    "explanation": "Distances to position 32:\n|10 - 32| = 22\n|25 - 32| = 7\n|40 - 32| = 8\n|55 - 32| = 23\n|70 - 32| = 38\nThe closest dock is at 25 (distance 7).",
    "solver": solve_pyml,
    "inputs": [
      "5 32\n10 25 40 55 70",
      "2 50\n40 60",
      "1 100\n100",
      "4 0\n-20 20 -10 10",
      "6 -15\n-50 -30 -10 0 20 40"
    ]
  },
  {
    "course": "Data Analytics",
    "id": "CODE-DA-01",
    "title": "Regional Sales Runner-up",
    "scenario": "A regional retail analytics dashboard determines annual bonus tiers. Management presents the silver award to the store with the second highest total revenue. If multiple stores tie for highest or any position, identical revenues share the same rank. Find the second highest distinct revenue figure. If all stores report identical revenues, output 'NO RUNNER UP'.",
    "inputFormat": "Line 1: An integer N representing the number of reporting stores.\nLine 2: N space-separated integers representing store revenues.",
    "outputFormat": "The second largest distinct revenue integer, or 'NO RUNNER UP'.",
    "constraints": "1 <= N <= 10^5\n0 <= revenue <= 10^9",
    "explanation": "Distinct revenue values in descending order: 620, 580, 490, 450, 310.\nThe second largest distinct value is 580.",
    "solver": solve_da,
    "inputs": [
      "6\n450 620 310 620 580 490",
      "3\n500 500 500",
      "2\n100 200",
      "5\n10 90 90 90 80",
      "7\n0 1000 500 1000 250 750 500"
    ]
  },
  {
    "course": "App Development",
    "id": "CODE-AD-01",
    "title": "Push Notification Stream Compaction",
    "scenario": "A mobile push daemon receives a burst sequence of category tags. When rapid retries occur, identical consecutive tags flood user devices. To optimize packet delivery, compress consecutive runs of identical alert tags into the tag followed by its run count.",
    "inputFormat": "Line 1: An integer N representing the number of notification tags in the stream.\nLine 2: N space-separated strings representing the incoming tags.",
    "outputFormat": "Space-separated pairs formatted as '<TAG> <COUNT>' for each consecutive sequence.",
    "constraints": "1 <= N <= 10^5\nEach tag is alphanumeric (length 1 to 20)",
    "explanation": "Consecutive runs:\n- ALERT: 2\n- PUSH: 1\n- EMAIL: 3\n- PUSH: 1\nResult: ALERT 2 PUSH 1 EMAIL 3 PUSH 1",
    "solver": solve_ad,
    "inputs": [
      "7\nALERT ALERT PUSH EMAIL EMAIL EMAIL PUSH",
      "1\nPING",
      "4\nSYNC SYNC SYNC SYNC",
      "6\nA B A B A B",
      "8\nMSG MSG WARN WARN WARN ERR ERR MSG"
    ]
  },
  {
    "course": "Internet of Things (IOT)",
    "id": "CODE-IOT-01",
    "title": "Greenhouse Temperature Spike Detector",
    "scenario": "An agricultural IoT node takes hourly temperature readings in an automated greenhouse. A 'heat spike' is defined as any consecutive reading where the temperature rises by at least D degrees compared to the previous hour. Count the total number of heat spikes and find the single maximum surge (temperature increase) recorded.",
    "inputFormat": "Line 1: Two space-separated integers N and D (reading count and spike threshold).\nLine 2: N space-separated integers representing consecutive hourly temperatures.",
    "outputFormat": "Two space-separated integers: <total_spikes> <max_surge>. If no spikes occurred, print '0 0'.",
    "constraints": "2 <= N <= 10^5\n1 <= D <= 100\n-40 <= temperature <= 60",
    "explanation": "Differences from previous hour:\n22 -> 26: +4 (>= 3, spike!)\n26 -> 25: -1\n25 -> 30: +5 (>= 3, spike!)\n30 -> 29: -1\n29 -> 35: +6 (>= 3, spike!)\nTotal spikes = 3. Max surge = 6.",
    "solver": solve_iot,
    "inputs": [
      "6 3\n22 26 25 30 29 35",
      "4 5\n20 22 23 21",
      "5 2\n10 15 20 25 30",
      "3 1\n0 -5 -10",
      "7 4\n-10 -4 0 5 3 10 9"
    ]
  },
  {
    "course": "Embedded System",
    "id": "CODE-ES-01",
    "title": "Sensor Frame Parity Verifier",
    "scenario": "An embedded controller receives serial 8-bit sensor frames. A frame is valid if the number of set bits (1s) in its binary representation is even (even parity). Count the number of valid frames received and compute their aggregate sum. If no frames are valid, output '0 0'.",
    "inputFormat": "Line 1: An integer N representing the number of sensor frames.\nLine 2: N space-separated integers (0 <= value <= 255).",
    "outputFormat": "Two space-separated integers: <valid_count> <sum_of_valid>.",
    "constraints": "1 <= N <= 10^5\n0 <= value <= 255",
    "explanation": "Binary set bits:\n3 = 00000011 (2 bits, even -> VALID)\n5 = 00000101 (2 bits, even -> VALID)\n7 = 00000111 (3 bits, odd -> INVALID)\n12 = 00001100 (2 bits, even -> VALID)\n15 = 00001111 (4 bits, even -> VALID)\nValid frames: 3, 5, 12, 15 (count = 4). Sum = 3 + 5 + 12 + 15 = 35.",
    "solver": solve_es,
    "inputs": [
      "5\n3 5 7 12 15",
      "3\n1 2 4",
      "4\n0 6 9 10",
      "1\n255",
      "6\n63 127 128 170 85 0"
    ]
  }
]

public_questions = {}
hidden_testcases = {}

for q in questions_def:
    cases = []
    for idx, inp in enumerate(q["inputs"]):
        expected = q["solver"](inp).strip()
        cases.append({
            "caseNumber": idx + 1,
            "input": inp,
            "expected": expected,
            "isHidden": idx > 0
        })
    
    public_questions[q["course"]] = [{
        "id": q["id"],
        "course": q["course"],
        "title": q["title"],
        "scenario": q["scenario"],
        "inputFormat": q["inputFormat"],
        "outputFormat": q["outputFormat"],
        "constraints": q["constraints"],
        "sampleInput": cases[0]["input"],
        "sampleOutput": cases[0]["expected"],
        "explanation": q["explanation"],
        "starterCode": starterCode
    }]
    
    hidden_testcases[q["id"]] = cases
    print(f"Generated {q['id']} ({q['course']}): Sample Output = {cases[0]['expected']!r}")

with open(os.path.join(root, "src", "data", "coding-questions.json"), "w", encoding="utf-8") as f:
    json.dump(public_questions, f, indent=2)

with open(os.path.join(root, "api", "_data", "coding-testcases.json"), "w", encoding="utf-8") as f:
    json.dump(hidden_testcases, f, indent=2)

print("\nSuccessfully generated coding questions and test cases!")
