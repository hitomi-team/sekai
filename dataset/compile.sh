#!/bin/bash

python3 build_data.py --data_dir=2ndperson/ --output="data_2ndperson.txt"
python3 build_data.py --data_dir=1stperson/ --output="data_1stperson.txt" --first_to_second
python3 build_data.py --output="data_compiled.txt" --combine_output_data