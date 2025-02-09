input = """
-799 0 2203 102 11993 5840 19185
""".replace("\n", "")

groups = ["linke", "bsw", "spd", "gruene", "fdp", "cdu", "afd"]

input = input.split(" ")

group = 180000

l = {
    "type": "twochildren"+str(group),
}


for i, e in enumerate(input):
    print((int(e) / group) * 100)
    l[groups[i]] = [(int(e) / group) * 100, 0]



import json
file_json = {}
with open('./src/data/taxdata.json', 'r') as openfile:
    file_json = json.load(openfile)

file_json["taxgroups"].append(l)

with open("./src/data/taxdata.json", "w") as outfile:
    json.dump(file_json, outfile)

print(json.dumps(l, indent=4))
