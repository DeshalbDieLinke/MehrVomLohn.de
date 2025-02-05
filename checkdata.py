import json

# Step 1: Read the JSON file
file_path = './src/data/taxdata.json'  # Replace with your actual file path



def to_int_array(input_string):
    return [int(num) for num in input_string.split()]

check_data = {
    'linke': [4125, 1936, 1846, 1840, 2378,3316, 3500,2189,-3547, -70679],
    'bsw': to_int_array("75 224 654 820 1083 1474 1482 1033 107 -5767"),
    'spd': to_int_array("268 373 682 795 926 1281 1438 1360 1179 -8892"),
    'gruene': to_int_array("119 437 846 1033 1140 1055 867 585 -122 -9833"),
    'fdp': to_int_array("-289 -36 292 663 1379 2758 4378 6734 11543 21083"),
    'cdu': to_int_array("11 13 63 176 414 907 1528 2587 5203 13248"),
    'afd': to_int_array("2 28 245 487 1064 2446 3926 5471 9067 20107"),
}

parties = {}

with open(file_path, 'r') as file:
    # Step 2: Parse the JSON data
    data = json.load(file)["taxgroups"]

filtered_array = [d for d in data if "type" in d and d["type"].isdigit()]

for i in filtered_array:
    for key, value in i.items():
        if key != "type":
            if key in parties:
                parties[key].append(round((value[0]/100)*int(i["type"])))
            else:
                parties[key] = [round((value[0]/100)*int(i["type"]))]

print(parties)

a = parties
b = check_data
assert a == b, '%s != %s' % (a, b)
