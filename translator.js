const CODON_TABLE = {
  'AUG': { name: 'Methionine (Start)', details: 'Initiates protein synthesis.' },
  'UUU': { name: 'Phenylalanine', details: 'An essential amino acid used in protein biosynthesis.' },
  'UUC': { name: 'Phenylalanine', details: 'An essential amino acid used in protein biosynthesis.' },
  'UUA': { name: 'Leucine', details: 'Helps with protein structure and energy production.' },
  'UUG': { name: 'Leucine', details: 'Helps with protein structure and energy production.' },
  'CUU': { name: 'Leucine', details: 'Helps with protein structure and energy production.' },
  'CUC': { name: 'Leucine', details: 'Helps with protein structure and energy production.' },
  'CUA': { name: 'Leucine', details: 'Helps with protein structure and energy production.' },
  'CUG': { name: 'Leucine', details: 'Helps with protein structure and energy production.' },
  'AUU': { name: 'Isoleucine', details: 'Supports muscle metabolism and immune function.' },
  'AUC': { name: 'Isoleucine', details: 'Supports muscle metabolism and immune function.' },
  'AUA': { name: 'Isoleucine', details: 'Supports muscle metabolism and immune function.' },
  'GUU': { name: 'Valine', details: 'Essential for muscle growth and tissue repair.' },
  'GUC': { name: 'Valine', details: 'Essential for muscle growth and tissue repair.' },
  'GUA': { name: 'Valine', details: 'Essential for muscle growth and tissue repair.' },
  'GUG': { name: 'Valine', details: 'Essential for muscle growth and tissue repair.' },
  'UCU': { name: 'Serine', details: 'Plays a role in metabolism and immune response.' },
  'UCC': { name: 'Serine', details: 'Plays a role in metabolism and immune response.' },
  'UCA': { name: 'Serine', details: 'Plays a role in metabolism and immune response.' },
  'UCG': { name: 'Serine', details: 'Plays a role in metabolism and immune response.' },
  'UGA': { name: 'STOP', details: '' },
  // Add similar details for other codons...
};

function translateCodons() {
  const dna = document.getElementById("dnaInput").value.trim().toUpperCase().replace(/[^ATCG]/g, '');
  const rna = dna.replace(/T/g, 'U');
  const output = document.getElementById("output");
  const proteinCountElement = document.getElementById("proteinCount");
  const chromosomeCountElement = document.getElementById("chromosomeCount");

  if (rna.length < 3) {
    output.innerText = "Please enter a valid DNA sequence with at least one codon.";
    proteinCountElement.innerText = 0;
    chromosomeCountElement.innerText = 0;
    return;
  }

  let translation = '';
  let proteinCount = 0;
  let chromosomeCount = Math.ceil(dna.length / 1000000); // Assuming 1 chromosome per 1M base pairs

  for (let i = 0; i <= rna.length - 3; i += 3) {
    let codon = rna.substring(i, i + 3);
    let proteinData = CODON_TABLE[codon];
    if (!proteinData) {
      translation += `<span class="codon">${codon}</span> → <span class="protein">Unknown</span>\n`;
      continue;
    }
    if (proteinData.name === 'STOP') break;
    translation += `<span class="codon">${codon}</span> → <span class="protein">${proteinData.name}</span>\n`;
    translation += `<span class="details">${proteinData.details}</span>\n\n`;
    proteinCount++;
  }

  output.innerHTML = translation || "No valid codons found.";
  proteinCountElement.innerText = proteinCount;
  chromosomeCountElement.innerText = chromosomeCount;
}

function copyOutput() {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = document.getElementById("output").innerHTML;

  const spans = tempDiv.querySelectorAll('span');
  spans.forEach(span => {
    const textNode = document.createTextNode(span.innerText);
    span.parentNode.replaceChild(textNode, span);
  });

  const plainText = tempDiv.innerText;

  navigator.clipboard.writeText(plainText).then(() => {
    alert("Protein sequence copied to clipboard!");
  }).catch(err => {
    alert("Failed to copy. Please try again.");
    console.error(err);
  });
}