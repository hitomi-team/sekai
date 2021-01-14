import argparse
import glob
import re

parser = argparse.ArgumentParser()
parser.add_argument('--data_dir', type=str, help='Specified directory with the pool files that need to be compiled.')
parser.add_argument('--output', type=str, help='Specified output location.', default='data.txt')
parser.add_argument('--first_to_second', help='Converts data from First Person to Second Person', action='store_true')
parser.add_argument('--combine_output_data', help='Combines data files in the current working directory together.', action='store_true')
args = parser.parse_args()

first_to_second_mappings = [
	("I'm", "you're"),
	("i'm", "you're"),
	("Im", "you're"),
	("im", "you're"),
	("Ive", "you've"),
	("ive", "you've"),
	("I am", "you are"),
	("i am", "you are"),
	("wasn't I", "weren't you"),
	("I", "you"),
	("I'd", "you'd"),
	("i", "you"),
	("I've", "you've"),
	("was I", "were you"),
	("am I", "are you"),
	("was i", "were you"),
	("am i", "are you"),
	("wasn't I", "weren't you"),
	("I", "you"),
	("i", "you"),
	("I'd", "you'd"),
	("i'd", "you'd"),
	("I've", "you've"),
	("i've", "you've"),
	("I was", "you were"),
	("i was", "you were"),
	("my", "your"),
	("we", "you"),
	("we're", "you're"),
	("mine", "yours"),
	("me", "you"),
	("us", "you"),
	("our", "your"),
	("I'll", "you'll"),
	("i'll", "you'll"),
	("myself", "yourself"),
]

def capitalize(word):
	return word[0].upper() + word[1:]

def replace_outside_quotes(text, current_word, repl_word):
	text = standardize_punctuation(text)
	reg_expr = re.compile(current_word + '(?=([^"]*"[^"]*")*[^"]*$)')
	output = reg_expr.sub(repl_word, text)
	return output

def mapping_variation_pairs(mapping):
	mapping_list = []
	mapping_list.append((" " + mapping[0] + " ", " " + mapping[1] + " "))
	mapping_list.append(
		(" " + capitalize(mapping[0]) + " ", " " + capitalize(mapping[1]) + " ")
	)

	# Change you it's before a punctuation
	if mapping[0] == "you":
		mapping = ("you", "me")
	mapping_list.append((" " + mapping[0] + ",", " " + mapping[1] + ","))
	mapping_list.append((" " + mapping[0] + "\?", " " + mapping[1] + "\?"))
	mapping_list.append((" " + mapping[0] + "\!", " " + mapping[1] + "\!"))
	mapping_list.append((" " + mapping[0] + "\.", " " + mapping[1] + "."))

	return mapping_list

def standardize_punctuation(text):
	text = text.replace("’", "'")
	text = text.replace("`", "'")
	text = text.replace("“", '"')
	text = text.replace("”", '"')
	text = text.replace("…", '...')
	text = text.replace("—", '-')
	return text

def first_to_second_person(text):
	if text[-1] not in [".", "?", "!"]:
		text += "."
	for pair in first_to_second_mappings:
		variations = mapping_variation_pairs(pair)
		for variation in variations:
			text = replace_outside_quotes(text, variation[0], variation[1])
	return text

with open(args.output, "w") as output_file:
        if args.combine_output_data:
                combined_data = ""

                data_files = glob.glob('*.txt')
                for i in data_files:
                        with open(i, "r") as fp:
                                combined_data += fp.read()
                
                output_file.write(combined_data)
        else:
                txt_files = glob.glob(args.data_dir + '/pool*.txt')

                raw_text = ""
                for i in txt_files:
                        with open(i, "r") as fp:
                                processed_file = fp.read()
                                processed_file = standardize_punctuation(processed_file)
                                if args.first_to_second:
                                        processed_file = first_to_second_person(processed_file)
                                raw_text += "<|startoftext|>" + processed_file + "<|endoftext|>\n"
                        
                output_file.write(raw_text)