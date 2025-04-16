import FreeSimpleGUI as sg
import pyperclip

CODON_TABLE = {
    'AUG': 'Methionine (Start)',
    'UUU': 'Phenylalanine', 'UUC': 'Phenylalanine',
    'UUA': 'Leucine', 'UUG': 'Leucine',
    'CUU': 'Leucine', 'CUC': 'Leucine', 'CUA': 'Leucine', 'CUG': 'Leucine',
    'AUU': 'Isoleucine', 'AUC': 'Isoleucine', 'AUA': 'Isoleucine',
    'GUU': 'Valine', 'GUC': 'Valine', 'GUA': 'Valine', 'GUG': 'Valine',
    'UCU': 'Serine', 'UCC': 'Serine', 'UCA': 'Serine', 'UCG': 'Serine',
    'CCU': 'Proline', 'CCC': 'Proline', 'CCA': 'Proline', 'CCG': 'Proline',
    'ACU': 'Threonine', 'ACC': 'Threonine', 'ACA': 'Threonine', 'ACG': 'Threonine',
    'GCU': 'Alanine', 'GCC': 'Alanine', 'GCA': 'Alanine', 'GCG': 'Alanine',
    'UAU': 'Tyrosine', 'UAC': 'Tyrosine',
    'CAU': 'Histidine', 'CAC': 'Histidine',
    'CAA': 'Glutamine', 'CAG': 'Glutamine',
    'AAU': 'Asparagine', 'AAC': 'Asparagine',
    'AAA': 'Lysine', 'AAG': 'Lysine',
    'GAU': 'Aspartic acid', 'GAC': 'Aspartic acid',
    'GAA': 'Glutamic acid', 'GAG': 'Glutamic acid',
    'UGU': 'Cysteine', 'UGC': 'Cysteine',
    'UGG': 'Tryptophan',
    'CGU': 'Arginine', 'CGC': 'Arginine', 'CGA': 'Arginine', 'CGG': 'Arginine',
    'AGU': 'Serine', 'AGC': 'Serine',
    'AGA': 'Arginine', 'AGG': 'Arginine',
    'GGU': 'Glycine', 'GGC': 'Glycine', 'GGA': 'Glycine', 'GGG': 'Glycine',
    'UAA': 'STOP', 'UAG': 'STOP', 'UGA': 'STOP'
}

def translate_dna(sequence):
    sequence = sequence.upper().replace('T', 'U')
    result = []
    for i in range(0, len(sequence) - 2, 3):
        codon = sequence[i:i+3]
        amino = CODON_TABLE.get(codon, 'Unknown')
        if amino == 'STOP':
            break
        result.append(f"{codon} → {amino}")
    return '\n'.join(result)

layout = [
    [sg.Text("Enter DNA Sequence:")],
    [sg.Multiline(size=(60, 5), key='-INPUT-', font=("Courier", 12))],
    [sg.Button("Translate"), sg.Button("Clear"), sg.Button("Copy"), sg.Button("Exit")],
    [sg.Text("Protein Sequence:")],
    [sg.Multiline(size=(60, 15), key='-OUTPUT-', font=("Courier", 12), disabled=True)]
]

window = sg.Window("Codon Translator", layout, resizable=True)

while True:
    event, values = window.read()
    if event in (sg.WINDOW_CLOSED, 'Exit'):
        break
    elif event == 'Translate':
        output = translate_dna(values['-INPUT-'])
        window['-OUTPUT-'].update(output)
    elif event == 'Clear':
        window['-INPUT-'].update('')
        window['-OUTPUT-'].update('')
    elif event == 'Copy':
        pyperclip.copy(values['-OUTPUT-'])

window.close()
