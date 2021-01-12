#!/bin/bash

python3 build_data.py --data_dir=2ndperson/ --output="data_2ndperson.txt"
python3 build_data.py --data_dir=prose/ --output="data_prose.txt"
python3 build_data.py --output="data_compiled.txt" --combine_output_data