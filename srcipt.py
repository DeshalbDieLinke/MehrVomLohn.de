input = """
3222 1789 1207 600 2141 589 1423
""".replace("\n", "")
groups = ["linke", "bsw", "spd", "gruene", "fdp", "cdu", "afd"]

input = input.split(" ")

group = 60000

l = {
    "type": "paar" + str(group),
}

for i, e in enumerate(input):
    print((int(e) / group) * 100)
    l[groups[i]] = [(int(e) / group) * 100, 0]

import json
print(json.dumps(l, indent=4))
