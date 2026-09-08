// Generated copy: the worldview paragraphs and contradiction call-outs.
// Kept separate from rendering/scoring so this is the one file to reread
// whenever the generated text needs a tone pass.

export function generateWorldview(scores) {
  const s = scores;
  let paras = [];
  let p1 = "";
  if (s[0] < -0.3) p1 += "You see the world through a physicalist lens: reality is matter and energy, and the supernatural holds little weight for you. ";
  else if (s[0] > 0.3) p1 += "You’re open to the idea that reality extends beyond the physical. Science is valuable, but something exists that it hasn’t fully grasped. ";
  else p1 += "Metaphysically, you’re unresolved: not ready to reduce everything to matter and energy, but not convinced there’s more to it either. ";
  if (s[1] < -0.3) p1 += "Your sense of self leans constructivist: the “I” is something built by the brain, not a fixed essence. ";
  else if (s[1] > 0.3) p1 += "You carry a strong sense that your self is real and essential, perhaps even extending beyond the body. ";
  else p1 += "You’re ambivalent about the self: you feel like a continuous person, but you can see the argument that it’s constructed. ";
  if (s[7] > 0.3) p1 += "And you believe consciousness is something genuinely special, not reducible to computation or neuroscience alone.";
  else if (s[7] < -0.3) p1 += "On consciousness, you lean materialist: when the brain stops, you stop, and in principle a sufficiently complex machine could think.";
  else p1 += "Your view of consciousness cuts both ways: you take neuroscience seriously, but you’re not convinced it can fully capture what it’s like to be you.";
  paras.push(p1);

  let p2 = "";
  if (s[2] < -0.3) p2 += "You trust science, logic, and evidence over intuition when it comes to figuring out what’s true. ";
  else if (s[2] > 0.3) p2 += "You trust your felt sense of things: some truths are known through experience and intuition, not just data. ";
  else p2 += "You value both science and intuition, seeing them as complementary rather than competing. ";
  if (s[3] < -0.3) p2 += "On free will, you lean deterministic: choices are the product of causes, and moral responsibility is more complicated than it seems. ";
  else if (s[3] > 0.3) p2 += "You believe in genuine free will: you could have chosen otherwise, and that matters for how we hold people accountable. ";
  else p2 += "Free will is where you feel the tension: part of you sees the causal chain, another part insists your choices are real. ";
  if (s[4] < -0.3) p2 += "Meaning, for you, is self-created. The universe doesn’t hand it to you; you build it through how you live.";
  else if (s[4] > 0.3) p2 += "You lean toward the idea that meaning needs grounding in something larger, whether divine, cosmic, or transcendent.";
  else p2 += "Meaning is unresolved for you: you can operate without a cosmic purpose, but the idea that there’s genuinely none of it still doesn’t sit easily.";
  paras.push(p2);

  let p3 = "";
  if (s[5] > 0.3) p3 += "Morally, you’re a realist: some things are simply wrong, period. ";
  else if (s[5] < -0.3) p3 += "You see morality as a human invention, shaped by culture and circumstance rather than discovered in the fabric of reality. ";
  else p3 += "Your moral grounding is mixed: you feel the pull of universal principles but recognize how culturally shaped morality is. ";
  if (s[6] > 0.3) p3 += "In ethics, you lean deontological: rules, duties, and intentions carry more weight than outcomes alone. ";
  else if (s[6] < -0.3) p3 += "You’re consequentialist at heart: what matters is whether an action makes the world better, not whether it follows a rule. ";
  else p3 += "Your normative ethics are pluralist: sometimes outcomes matter most, sometimes principles do. ";
  if (s[8] < -0.3) p3 += "Despite everything, you affirm life. You’d choose it again.";
  else if (s[8] > 0.3) p3 += "There’s a pessimistic thread running through your worldview: you see suffering clearly and aren’t sure the trade is worth it.";
  else p3 += "Existentially, you land in a realistic middle: grateful to be here, clear-eyed about suffering, not quite ready to call life a gift or a burden.";
  paras.push(p3);
  return paras;
}

export function detectContradictions(scores) {
  const s = scores;
  const t = [];
  if (s[0] < -0.2 && s[7] > 0.2) t.push({ dims: "Metaphysics × Philosophy of Mind",
    text: "You lean physicalist but believe consciousness can’t be fully explained by physical science. If everything is atoms and energy, what is this \"extra something\" that subjective experience seems to have?" });
  if (s[1] < -0.2 && s[3] > 0.3) t.push({ dims: "Self × Free Will",
    text: "You see the self as something the brain constructs, yet believe in robust free will. If there’s no essential \"you\" behind the curtain, who exactly is doing the free choosing?" });
  if (s[5] > 0.3 && s[4] < -0.3) t.push({ dims: "Moral Grounding × Meaning",
    text: "You believe morality is objective but meaning is self-created. If the universe doesn’t hand you purpose, where do these universal moral truths come from?" });
  if (s[0] < -0.3 && s[1] > 0.3) t.push({ dims: "Metaphysics × Self",
    text: "You lean physicalist but believe in an essential self or soul. If reality is purely physical, what grounds that essential \"you\"?" });
  if (s[3] < -0.3 && s[8] < -0.3) t.push({ dims: "Free Will × Existential Orientation",
    text: "You lean determinist but deeply affirm life. If your choices were inevitable products of prior causes, what does it mean to say you’d \"choose\" this life again?" });
  if (s[2] < -0.3 && s[7] > 0.3) t.push({ dims: "Epistemology × Philosophy of Mind",
    text: "You trust reason and evidence as the path to truth, yet believe subjective experience escapes scientific explanation. If science is the best tool we have but can’t fully capture what it’s like to be you, your epistemology has a blind spot." });
  if (s[6] < -0.3 && s[5] > 0.3) t.push({ dims: "Normative Ethics × Moral Grounding",
    text: "You lean consequentialist but believe in objective moral truths. If morality is real and discoverable, you might expect it to come with duties and constraints, not just a utilitarian calculus." });
  if (s[4] > 0.3 && s[8] > 0.3) t.push({ dims: "Meaning × Existential Orientation",
    text: "You think meaning requires a cosmic source but also lean pessimistic. That’s a heavy combination: needing transcendence to justify existence but not finding it." });
  if (s[0] > 0.3 && s[7] < -0.3) t.push({ dims: "Metaphysics × Philosophy of Mind",
    text: "You’re open to the supernatural, yet on consciousness you’re a materialist. If consciousness is just neurons, what exactly is the \"more\" you sense in reality?" });
  if (s[3] > 0.3 && s[0] < -0.5) t.push({ dims: "Free Will × Metaphysics",
    text: "You’re a strong physicalist but believe in free will. In a universe of atoms obeying physical laws, where does free choice enter?" });
  if (s[5] < -0.3 && s[6] > 0.3) t.push({ dims: "Moral Grounding × Normative Ethics",
    text: "You see morality as invented by humans, yet lean toward absolute rules and duties. If morality is just a human construction, why should any rule be unbreakable?" });
  return t.slice(0, 3);
}
