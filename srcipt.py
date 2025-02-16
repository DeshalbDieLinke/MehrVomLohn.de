input = """
0.0 0.2 1.1 1.7 2.8 4.9 6.1 6.7 7.7 7.7
""".replace("\n", "")

# parties = ["linke", "bsw", "spd", "gruene", "fdp", "cdu", "afd"]

input = input.split(" ")
print(input)

party = "afd"

# l = {
#     "type": str(group),
# }

import json

file_json = {}
with open('./src/data/taxdata.json', 'r') as openfile:
    file_json = json.load(openfile)

for i, g in enumerate(file_json["taxgroups"]):
    # for key, value in g.items():
        # if key != "type" and value == party:
            # for i, p in enumerate(g["parties"]):
    print("g", g)
    if "twochildren" not in g["type"] and "paar" not in g["type"]:
        g[party][0] = float(input[i])

    # for i, p in enumerate(parties):
    #     g[p][0] = float(input[i])
    # break

print(json.dumps(file_json, indent=4))

with open("./src/data/taxdata.json", "w") as outfile:
    json.dump(file_json, outfile)
