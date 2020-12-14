import glob

def load_file(filename):
        with open(filename, "r") as fp:
                text = fp.read()
        return text

with open("data.txt", "w") as output_file:
        txt_files = glob.glob('pool*.txt')

        raw_text = ""
        start_token = "<|startoftext|>"
        end_token = "<|endoftext|>"
        for i in txt_files:
                raw_text += start_token + load_file(i) + end_token + "\n"
        
        output_file.write(raw_text)