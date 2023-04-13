export default function alignSwitch(value) {
  const alignmentMap = {
    l: "left",
    r: "right",
    c: "center",
  };

  return alignmentMap[value] || null;
}
