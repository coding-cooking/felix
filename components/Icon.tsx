import * as React from "react";
type IconProps = React.SVGProps<SVGSVGElement>;
import styled from "@emotion/styled";

const SvgWrapper = styled.svg`
  fill: #000000;
`;

export const LogoSvg = (props: IconProps) => {
  return (
    <SvgWrapper
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="418"
      height="212"
      viewBox="0 0 418 212"
      preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      <g
        transform="translate(0,212) scale(0.1,-0.1)"
        fill="currentColor"
        stroke="none"
      >
        <path
          d="M840 1829 c-90 -22 -177 -47 -205 -59 -11 -5 -45 -19 -75 -31 -81
-33 -148 -80 -164 -114 -24 -53 -37 -233 -39 -525 -2 -350 20 -517 83 -648 51
-105 146 -93 192 24 17 43 30 188 37 405 1 11 22 24 64 39 218 80 337 180 337
282 -1 73 -35 98 -133 98 -70 0 -173 -29 -248 -70 -9 -5 -20 -6 -23 -3 -8 8
-7 77 2 127 7 42 11 44 87 76 196 82 314 171 356 268 27 61 24 93 -9 125 -26
25 -34 27 -108 26 -43 -1 -113 -10 -154 -20z"
        />
        <path
          d="M2202 1765 c-33 -27 -85 -127 -102 -195 -42 -164 -53 -266 -54 -495
-1 -173 3 -261 17 -355 18 -127 24 -148 60 -254 40 -115 118 -157 187 -100 55
47 64 81 64 254 0 85 -1 294 -1 465 0 171 0 378 0 460 1 135 -1 154 -20 191
-12 23 -29 44 -38 48 -36 13 -84 6 -113 -19z"
        />
        <path
          d="M2680 1783 c-8 -3 -27 -17 -42 -31 -37 -34 -40 -103 -6 -126 47 -33
155 -7 192 46 22 31 20 74 -4 98 -15 15 -33 20 -72 19 -29 0 -60 -3 -68 -6z"
        />
        <path
          d="M1435 1513 c-93 -38 -169 -117 -230 -238 -82 -166 -107 -364 -65
-518 105 -381 433 -491 696 -232 101 100 133 204 78 256 -43 40 -93 33 -194
-27 -112 -68 -147 -79 -200 -63 -44 13 -90 59 -90 89 0 14 13 20 67 30 37 6
72 15 78 19 5 5 21 12 35 16 82 25 196 138 242 241 33 74 32 211 -2 277 -31
61 -87 112 -157 143 -66 29 -194 33 -258 7z m178 -250 c39 -44 29 -113 -21
-150 -25 -18 -140 -63 -162 -63 -18 0 -10 64 14 115 44 94 128 142 169 98z"
        />
        <path
          d="M2648 1443 c-36 -39 -54 -79 -75 -164 -15 -63 -18 -120 -18 -379 0
-263 3 -314 18 -369 31 -107 59 -141 119 -141 30 0 45 7 65 27 74 81 94 199
97 567 1 235 -1 281 -18 344 -10 40 -28 87 -40 105 -19 28 -28 32 -72 35 -43
3 -53 -1 -76 -25z"
        />
        <path
          d="M3669 1440 c-19 -10 -59 -40 -88 -66 -55 -49 -201 -234 -201 -254 0
-29 -27 3 -65 76 -48 93 -112 180 -154 212 -39 28 -106 29 -141 2 -22 -16 -25
-26 -24 -77 1 -75 55 -229 128 -366 14 -26 26 -55 26 -63 0 -9 -15 -39 -34
-67 -75 -113 -148 -258 -167 -329 -11 -40 -10 -49 7 -79 17 -30 26 -34 65 -37
40 -3 51 2 109 46 36 27 89 78 119 113 97 113 90 109 125 64 99 -127 204 -215
256 -215 56 0 97 62 86 130 -7 44 -71 174 -129 261 -20 31 -37 64 -37 73 0 9
51 103 113 209 142 241 162 303 116 361 -25 31 -59 33 -110 6z"
        />
      </g>
    </SvgWrapper>
  );
};
