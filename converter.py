import json
import csv
import sys
import string


def main():
    args = sys.argv[1:]
    if len(args) != 2:
        print("Incorrect number of arguments.\nCorrect usage: python converter.py [csv_filename] [json_filename]")
    csv_filename = args[0]
    json_filename = args[1]

    csv_file = open(csv_filename, "r")
    json_file = open(json_filename, "w")

    if not csv_file:
        print("Error opening csv file. Ensure the filename is valid and try again.")
        return 0
    if not json_file:
        print("Error opening json file. Ensure the filename is valid and try again.")
        return 0

    data = read_csv(csv_file)
    write_json(json_file, data)
    return 0

#file: the file to read from
#returns a list of dictionary items
def read_csv(file):
    reader = csv.reader(file)
    line = 0
    categories = []
    data = []
    for row in reader:
        if line == 0:
            categories=row
            for x in range(len(categories)):
                categories[x] = categories[x].lower()
            line+=1
        else:
            element = {}
            for x in range(len(row)):
                if x in [3, 4]:
                    row[x] = float(row[x])
                element[categories[x]] = row[x]
            data.append(element)
    return data;

#file: the file to write to
#data: the list of dicts to write to the file
def write_json(file, data):
    songs = {'songs':data}
    json.dump(songs, file, indent=4)
    return 0

if __name__ == "__main__":
    main()
