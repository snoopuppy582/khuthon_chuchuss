import Image from "next/image";

export function ConstellationBackdrop() {
  return (
    <div className="constellation-backdrop" aria-hidden="true">
      <Image
        className="hero-moon-image"
        src="/media/moon-background-clean.png"
        alt=""
        width={260}
        height={260}
        priority
      />
      <svg className="constellation-map" viewBox="0 0 1000 520" preserveAspectRatio="none">
        <g className="constellation constellation-dipper">
          <polyline points="88,184 154,154 220,164 286,138 350,108 412,92 468,120" />
          <polyline points="220,164 232,224 298,242 350,108" />
          {[88, 154, 220, 286, 350, 412, 468].map((x, index) => (
            <circle key={x} cx={x} cy={[184, 154, 164, 138, 108, 92, 120][index]} r={index === 4 ? 4.8 : 3.7} />
          ))}
          <circle cx="232" cy="224" r="3.4" />
          <circle cx="298" cy="242" r="3.4" />
        </g>

        <g className="constellation constellation-orion">
          <polyline points="650,84 714,146 770,92" />
          <polyline points="714,146 698,218 738,226 720,294" />
          <polyline points="630,286 698,218 790,294" />
          <polyline points="662,182 704,190 746,198" />
          {[
            [650, 84, 4.6],
            [714, 146, 3.7],
            [770, 92, 4.3],
            [698, 218, 4.1],
            [738, 226, 4.1],
            [720, 294, 4.8],
            [630, 286, 4.2],
            [790, 294, 4.2],
            [662, 182, 2.9],
            [704, 190, 2.9],
            [746, 198, 2.9]
          ].map(([cx, cy, r]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
          ))}
        </g>

        <g className="constellation constellation-cassiopeia">
          <polyline points="548,334 592,286 646,332 700,278 756,322" />
          {[
            [548, 334],
            [592, 286],
            [646, 332],
            [700, 278],
            [756, 322]
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.8" />
          ))}
        </g>
      </svg>
    </div>
  );
}
