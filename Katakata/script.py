import json
dic = {}

with open('all.json', 'r') as file:
    data = json.load(file)
    print(len(data))
    for item in data:
        if item['word'] not in dic:
            dic[item['word']] = item

with open('dictionary.json', 'w') as file:
    json.dump(dic, file, indent=4, ensure_ascii=False)