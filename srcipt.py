input = """
-70679 -5767 -8892 -9833 21083 13248 20107
""".replace("\n", "")




# -2547 107 1179 -122 11543 5203 9067
# 2189 1033 1360 867 6734 2587 5471
# 3316 1474 1281 1055 2758 907 1064
# 2378 1038 926 1140 1379 414 487
groups = ["linke", "bsw", "spd", "gruene", "fdp", "cdu", "afd"]

input = input.split(" ")

group = 2000000

l = {
    "type": str(group),
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
