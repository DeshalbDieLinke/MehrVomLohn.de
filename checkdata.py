import json

# Step 1: Read the JSON file
file_path = './src/data/taxdata.json'  # Replace with your actual file path


def to_int_array(input_string):
    return [int(num) for num in input_string.split()]


parties = {}

with open(file_path, 'r') as file:
    # Step 2: Parse the JSON data
    data = json.load(file)["taxgroups"]

# filtered_array = [d for d in data if "type" in d and d["type"].isdigit()]

for i in range(0, len(data)):
    for key, value in data[i].items():
        group = int(data[i]["type"].replace("twochildren",
                                            "").replace("paar", ""))
        if key != "type":
            data[i][key] = [value[0], round((value[0] / 100) * group)]

print(data)
#
import json
file_json = {}
with open('./src/data/taxdata.json', 'r') as openfile:
    file_json = json.load(openfile)

file_json["taxgroups"] = data

with open("./src/data/taxdata.json", "w") as outfile:
    json.dump(file_json, outfile)

print(json.dumps(data, indent=4))
#
# a = parties
# b = check_data
# assert a == b, '%s != %s' % (a, b)
