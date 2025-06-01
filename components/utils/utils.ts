export const CHART_OFFSETS = {
  left: 0,
  top: 6
} as const;

export const calculateFurcationPosition = (left: number, top: number) => ({
  left: left - CHART_OFFSETS.left,
  top: top - CHART_OFFSETS.top
});

export const transcribeModels = ['whisper-1', 'gpt-4o-transcribe', 'gpt-4o-mini-transcribe']


export const teethStatus: Record<string, string> = {
  "18": "present",
  "17": "present",
  "16": "present",
  "15": "present",
  "14": "present",
  "13": "present",
  "12": "present",
  "11": "present",
  "21": "present",
  "22": "present",
  "23": "present",
  "24": "present",
  "25": "present",
  "26": "present",
  "27": "present",
  "28": "present",
  "38": "present",
  "37": "present",
  "36": "present",
  "35": "present",
  "34": "present",
  "33": "present",
  "32": "present",
  "31": "present",
  "41": "present",
  "42": "present",
  "43": "present",
  "44": "present",
  "45": "present",
  "46": "present",
  "47": "present",
  "48": "present",
};

export const teethWithTwoFurcations = [
  "14p", "16p", "17p", "18p",
  "24p", "26p", "27p", "28p"
] as const;

export const teethWithOneFurcation = [
  "18b", "17b", "16b", "26b", "27b", "28b",
  "48b", "47b", "46b", "38b", "37b", "36b",
  "38l", "37l", "36l", "46l", "47l", "48l"
] as const;

export const toothData = [
 {
    toothNumber: "18b",
    xCoords: [295, 313.5, 332],
    xinterCoords: [332, 346],
    absenceLine: { left: 301.55, top: 488.55 },
    implantLayout: { left: 279, top: 466, width: 60, height: 137 },
    teethStatus: teethStatus[18],
    furcation: [calculateFurcationPosition(304.5, 558.45)]
  },
  {
    toothNumber: "17b", 
    xCoords: [346, 366, 386],
    xinterCoords: [386, 397],
    absenceLine: { left: 361.45, top: 478.55 },
    implantLayout: { left: 339, top: 466, width: 54, height: 137 },
    teethStatus: teethStatus[17],
    furcation: [calculateFurcationPosition(357.5, 556.5)]
  },
  {
    toothNumber: "16b",
    xCoords: [397, 424, 451], 
    xinterCoords: [451, 463],
    absenceLine: { left: 417.95, top: 478.55 },
    implantLayout: { left: 393, top: 466, width: 62, height: 137 },
    teethStatus: teethStatus[16],
    furcation: [calculateFurcationPosition(415.5, 555.5)]
  },
  {
    toothNumber: "15b",
    xCoords: [463, 476, 489],
    xinterCoords: [489, 504], 
    absenceLine: { left: 472.45, top: 478.55 },
    implantLayout: { left: 455.95, top: 466, width: 41, height: 137 },
    teethStatus: teethStatus[15]
  },
  {
    toothNumber: "14b",
    xCoords: [504, 516, 528],
    xinterCoords: [528, 544],
    absenceLine: { left: 513.45, top: 478.55 },
    implantLayout: { left: 495.95, top: 466, width: 43, height: 137 },
    teethStatus: teethStatus[14]
  },
  {
    toothNumber: "13b",
    xCoords: [544, 557, 570],
    xinterCoords: [570, 588],
    absenceLine: { left: 553.95, top: 478.55 },
    implantLayout: { left: 539, top: 466, width: 42, height: 137 },
    teethStatus: teethStatus[13]
  },
  {
    toothNumber: "12b",
    xCoords: [588, 600, 612],
    xinterCoords: [612, 628],
    absenceLine: { left: 597.95, top: 478.55 },
    implantLayout: { left: 581, top: 466, width: 37, height: 137 },
    teethStatus: teethStatus[12]
  },
  {
    toothNumber: "11b", 
    xCoords: [628, 644, 660],
    xinterCoords: [0, 0],
    absenceLine: { left: 638.95, top: 488.55 },
    implantLayout: { left: 618, top: 466, width: 62, height: 137 },
    teethStatus: teethStatus[11]
  },
  {
    toothNumber: "28b",
    xCoords: [1063, 1044.5, 1026],
    xinterCoords: [1026, 1011],
    absenceLine: { left: 1044.4, top: 478.55 },
    implantLayout: { left: 1020, top: 466, width: 60, height: 137 },
    furcation: [calculateFurcationPosition(1037.5, 558.45)]
},
{
    toothNumber: "27b",
    xCoords: [1011, 991.5, 972],
    xinterCoords: [972, 961],
    absenceLine: { left: 987.9, top: 478.55 },
    implantLayout: { left: 965, top: 466, width: 55, height: 137 },
    furcation: [calculateFurcationPosition(984, 556.5)]
},
{
    toothNumber: "26b",
    xCoords: [961, 934, 907],
    xinterCoords: [907, 895],
    absenceLine: { left: 931.45, top: 478.55 },
    implantLayout: { left: 903, top: 466, width: 62, height: 137 },
    furcation: [calculateFurcationPosition(927.5, 555.5)]
  },
  {
    toothNumber: "25b",
    xCoords: [895, 882, 869],
    xinterCoords: [869, 855],
    absenceLine: { left: 873.45, top: 478.55 },
    implantLayout: { left: 863, top: 466, width: 40, height: 137 }
  },
  {
    toothNumber: "24b",
    xCoords: [855, 842, 829],
    xinterCoords: [829, 815],
    absenceLine: { left: 832.45, top: 478.55 },
    implantLayout: { left: 820, top: 466, width: 43, height: 137 }
  },
  {
    toothNumber: "23b",
    xCoords: [815, 801, 787],
    xinterCoords: [787, 770],
    absenceLine: { left: 792.95, top: 478.55 },
    implantLayout: { left: 778, top: 417, width: 42, height: 237 }
  },
  {
    toothNumber: "22b",
    xCoords: [770, 758, 746],
    xinterCoords: [746, 729],
    absenceLine: { left: 749.45, top: 478.55 },
    implantLayout: { left: 741, top: 466, width: 37, height: 137 }
  },
  {
    toothNumber: "21b",
    xCoords: [729, 713.5, 698],
    xinterCoords: [0, 0],
    absenceLine: { left: 703.45, top: 488.55 },
    implantLayout: { left: 680, top: 466, width: 61, height: 137 }
  },
   {
    toothNumber: "18p",
    xCoords: [295, 313.5, 332],
    xinterCoords: [332, 346],
    absenceLine: { left: 295.45, top: 642.25 },
    implantLayout: { left: 279, top: 687, width: 60, height: 119 },
    furcation: [calculateFurcationPosition(288.7, 704.2), calculateFurcationPosition(315.5, 710.7)],
    status: teethStatus[18]
},
{
    toothNumber: "17p",
    xCoords: [346, 366, 386],
    xinterCoords: [386, 397],
    absenceLine: { left: 351.45, top: 642.25 },
    implantLayout: { left: 339, top: 680, width: 54, height: 137 },
    furcation: [calculateFurcationPosition(340, 716.5), calculateFurcationPosition(364, 719)],
    status: teethStatus[17]
},
{
    toothNumber: "16p",
    xCoords: [397, 424, 451],
    xinterCoords: [451, 463],
    absenceLine: { left: 414.45, top: 642.25 },
    implantLayout: { left: 393, top: 685, width: 62, height: 137 },
    furcation: [calculateFurcationPosition(397.5, 720.5), calculateFurcationPosition(431.5, 707.5)],
    status: teethStatus[16]
},
  {
    toothNumber: "15p",
    xCoords: [463, 476, 489],
    xinterCoords: [489, 504],
    absenceLine: { left: 464.95, top: 642.25 },
    implantLayout: { left: 455.95, top: 680, width: 41, height: 137 },
    status: teethStatus[15]
  },
  {
    toothNumber: "14p",
    xCoords: [504, 516, 528],
    xinterCoords: [528, 544],
    absenceLine: { left: 507.45, top: 642.25 },
    implantLayout: { left: 495.95, top: 687, width: 43, height: 137 },
    status: teethStatus[14],
    furcation: [calculateFurcationPosition(501.5, 718.5), calculateFurcationPosition(518.5, 712.5)]
  },
  {
    toothNumber: "13p",
    xCoords: [544, 557, 570],
    xinterCoords: [570, 588],
    absenceLine: { left: 549.95, top: 642.25 },
    implantLayout: { left: 539, top: 687, width: 42, height: 137 },
    status: teethStatus[13]
  },
  {
    toothNumber: "12p",
    xCoords: [588, 600, 612],
    xinterCoords: [612, 628],
    absenceLine: { left: 589.45, top: 642.25 },
    implantLayout: { left: 580.95, top: 687, width: 37, height: 137 },
    status: teethStatus[12]
  },
  {
    toothNumber: "11p",
    xCoords: [628, 644, 660],
    xinterCoords: [0, 0],
    absenceLine: { left: 633.95, top: 642.25 },
    implantLayout: { left: 618, top: 687, width: 62, height: 119 },
    status: teethStatus[11]
  },
   {
    toothNumber: "28p",
    xCoords: [1063, 1044.5, 1026],
    xinterCoords: [1026, 1011],
    absenceLine: { left: 1039.9, top: 642.25 },
    implantLayout: { left: 1020, top: 687, width: 60, height: 119 },
    furcation: [calculateFurcationPosition(1027.5, 710.7), calculateFurcationPosition(1053.5, 705.5)],
    status: teethStatus[17]
},
{
    toothNumber: "27p",
    xCoords: [1011, 991.5, 972],
    xinterCoords: [972, 961],
    absenceLine: { left: 983.4, top: 645.25 },
    implantLayout: { left: 965, top: 687, width: 55, height: 137 },
    furcation: [calculateFurcationPosition(978.5, 715.7), calculateFurcationPosition(1002.5, 716.5)],
    status: teethStatus[17]
},
{
    toothNumber: "26p",
    xCoords: [961, 934, 907],
    xinterCoords: [907, 895],
    absenceLine: { left: 926.95, top: 642.25 },
    implantLayout: { left: 903, top: 687, width: 62, height: 137 },
    furcation: [calculateFurcationPosition(912.5, 707.5), calculateFurcationPosition(947.5, 720.5)],
    status: teethStatus[17]
},
  {
    toothNumber: "25p",
    xCoords: [895, 882, 869],
    xinterCoords: [869, 855],
    absenceLine: { left: 869.95, top: 642.25 },
    implantLayout: { left: 863, top: 687, width: 40, height: 137 },
    status: teethStatus[17]
  },
  {
    toothNumber: "24p",
    xCoords: [855, 842, 829],
    xinterCoords: [829, 815],
    absenceLine: { left: 828.95, top: 642.25 },
    implantLayout: { left: 820, top: 687, width: 43, height: 137 },
    status: teethStatus[17],
    furcation: [calculateFurcationPosition(825.5, 712.5), calculateFurcationPosition(842.5, 718.5)]
  },
  {
    toothNumber: "23p",
    xCoords: [815, 801, 787],
    xinterCoords: [787, 770],
    absenceLine: { left: 789.45, top: 642.25 },
    implantLayout: { left: 778, top: 687, width: 42, height: 137 },
    status: teethStatus[17]
  },
  {
    toothNumber: "22p",
    xCoords: [770, 758, 746],
    xinterCoords: [746, 729],
    absenceLine: { left: 740.95, top: 642.25 },
    implantLayout: { left: 741, top: 687, width: 37, height: 137 },
    status: teethStatus[17]
  },
  {
    toothNumber: "21p",
    xCoords: [729, 713.5, 698],
    xinterCoords: [0, 0],
    absenceLine: { left: 698.45, top: 642.25 },
    implantLayout: { left: 680, top: 687, width: 61, height: 119 },
    status: teethStatus[17]
  },
{
    toothNumber: "48b",
    xCoords: [296, 319, 342],
    xinterCoords: [342, 358],
    absenceLine: { left: 307.65, top: 1257.55 },
    implantLayout: { left: 287, top: 1295, width: 64, height: 131 },
    furcation: [calculateFurcationPosition(308.5, 1328.5)]
},
{
    toothNumber: "47b",
    xCoords: [358, 382, 406],
    xinterCoords: [406, 422],
    absenceLine: { left: 372.65, top: 1257.55 },
    implantLayout: { left: 351, top: 1295, width: 62, height: 131 },
    furcation: [calculateFurcationPosition(375.5, 1328.5)]
},
{
    toothNumber: "46b",
    xCoords: [422, 445.5, 469],
    xinterCoords: [469, 492],
    absenceLine: { left: 434.65, top: 1257.55 },
    implantLayout: { left: 413, top: 1295, width: 67, height: 131 },
    furcation: [calculateFurcationPosition(442.5, 1323.5)]
},
  {
    toothNumber: "45b",
    xCoords: [492, 502.5, 513],
    xinterCoords: [513, 533],
    absenceLine: { left: 492.15, top: 1257.55 },
    implantLayout: { left: 480, top: 1295, width: 43, height: 131 }
  },
  {
    toothNumber: "44b",
    xCoords: [533, 543, 553],
    xinterCoords: [553, 570],
    absenceLine: { left: 533.65, top: 1257.55 },
    implantLayout: { left: 523, top: 1295, width: 37, height: 131 }
  },
  {
    toothNumber: "43b",
    xCoords: [570, 581, 592],
    xinterCoords: [592, 610],
    absenceLine: { left: 574.15, top: 1257.55 },
    implantLayout: { left: 560, top: 1295, width: 39, height: 131 }
  },
  {
    toothNumber: "42b",
    xCoords: [610, 619.5, 629],
    xinterCoords: [629, 643],
    absenceLine: { left: 611.65, top: 1257.55 },
    implantLayout: { left: 599, top: 1295, width: 38, height: 131 }
  },
  {
    toothNumber: "41b",
    xCoords: [643, 652.5, 662],
    xinterCoords: [0, 0],
    absenceLine: { left: 644.15, top: 1257.55 },
    implantLayout: { left: 637, top: 1295, width: 43, height: 131 }
  },

  // Fourth quadrant lingual
  {
    toothNumber: "48l",
    xCoords: [296, 319, 342],
    xinterCoords: [342, 358],
    absenceLine: { left: 312.15, top: 1092.1 },
    implantLayout: { left: 287, top: 1073, width: 68, height: 133 }
  },
  {
    toothNumber: "47l",
    xCoords: [358, 382, 406],
    xinterCoords: [406, 422],
    absenceLine: { left: 378.65, top: 1092.1 },
    implantLayout: { left: 355, top: 1073, width: 63, height: 133 }
  },
  {
    toothNumber: "46l",
    xCoords: [422, 445.5, 469],
    xinterCoords: [469, 492],
    absenceLine: { left: 437.15, top: 1092.1 },
    implantLayout: { left: 418, top: 1073, width: 62, height: 133 }
  },
  {
    toothNumber: "45l",
    xCoords: [492, 502.5, 513],
    xinterCoords: [513, 533],
    absenceLine: { left: 490.65, top: 1092.1 },
    implantLayout: { left: 480, top: 1073, width: 43, height: 133 }
  },
  {
    toothNumber: "44l",
    xCoords: [533, 543, 553],
    xinterCoords: [553, 570],
    absenceLine: { left: 534.65, top: 1092.1 },
    implantLayout: { left: 523, top: 1073, width: 40, height: 133 }
  },
  {
    toothNumber: "43l",
    xCoords: [570, 581, 592],
    xinterCoords: [592, 610],
    absenceLine: { left: 574.15, top: 1092.1 },
    implantLayout: { left: 563, top: 1073, width: 36, height: 133 }
  },
  {
    toothNumber: "42l",
    xCoords: [610, 619.5, 629],
    xinterCoords: [629, 643],
    absenceLine: { left: 610.15, top: 1092.1 },
    implantLayout: { left: 599, top: 1073, width: 35, height: 133 }
  },
  {
    toothNumber: "41l",
    xCoords: [643, 652.5, 662],
    xinterCoords: [0, 0],
    absenceLine: { left: 643.15, top: 1092.1 },
    implantLayout: { left: 634, top: 1073, width: 46, height: 133 }
  },

  // Third quadrant (31-38)
 {
    toothNumber: "38b",
    xCoords: [1061, 1038.5, 1016],
    xinterCoords: [1016, 999],
    absenceLine: { left: 1035.1, top: 1257.55 },
    implantLayout: { left: 1008, top: 1295, width: 80, height: 138 },
    furcation: [calculateFurcationPosition(1034.5, 1328.5)]
},
{
    toothNumber: "37b",
    xCoords: [999, 975.5, 952],
    xinterCoords: [952, 936],
    absenceLine: { left: 964.6, top: 1257.55 },
    implantLayout: { left: 946, top: 1295, width: 62, height: 137 },
    furcation: [calculateFurcationPosition(967, 1328.5)]
},
{
    toothNumber: "36b",
    xCoords: [936, 911.5, 887],
    xinterCoords: [887, 864],
    absenceLine: { left: 901.15, top: 1257.55 },
    implantLayout: { left: 879, top: 1295, width: 67, height: 131 },
    furcation: [calculateFurcationPosition(900.5, 1323.5)]
},
  {
    toothNumber: "35b",
    xCoords: [864, 854.5, 845],
    xinterCoords: [845, 824],
    absenceLine: { left: 845.15, top: 1257.55 },
    implantLayout: { left: 836, top: 1295, width: 43, height: 131 }
  },
  {
    toothNumber: "34b",
    xCoords: [824, 814.5, 805],
    xinterCoords: [805, 787],
    absenceLine: { left: 805.15, top: 1257.55 },
    implantLayout: { left: 798, top: 1295, width: 38, height: 131 }
  },
  {
    toothNumber: "33b",
    xCoords: [787, 776.5, 766],
    xinterCoords: [766, 748],
    absenceLine: { left: 766.65, top: 1257.55 },
    implantLayout: { left: 759, top: 1295, width: 39, height: 133 }
  },
  {
    toothNumber: "32b",
    xCoords: [748, 738, 728],
    xinterCoords: [728, 714],
    absenceLine: { left: 728.15, top: 1257.55 },
    implantLayout: { left: 722, top: 1295, width: 38, height: 132 }
  },
  {
    toothNumber: "31b",
    xCoords: [714, 704.5, 695],
    xinterCoords: [0, 0],
    absenceLine: { left: 692.65, top: 1257.55 },
    implantLayout: { left: 680, top: 1295, width: 42, height: 131 }
  },

  // Third quadrant lingual
  {
    toothNumber: "38l",
    xCoords: [1061, 1038.5, 1016],
    xinterCoords: [1016, 999],
    absenceLine: { left: 1030.6, top: 1092.1 },
    implantLayout: { left: 1004, top: 1073, width: 84, height: 133 }
  },
  {
    toothNumber: "37l",
    xCoords: [999, 975.5, 952],
    xinterCoords: [952, 936],
    absenceLine: { left: 965.1, top: 1092.1 },
    implantLayout: { left: 941, top: 1073, width: 63, height: 133 }
  },
  {
    toothNumber: "36l",
    xCoords: [936, 911.5, 887],
    xinterCoords: [887, 864],
    absenceLine: { left: 905.65, top: 1092.1 },
    implantLayout: { left: 880, top: 1073, width: 61, height: 133 }
  },
  {
    toothNumber: "35l",
    xCoords: [864, 854.5, 845],
    xinterCoords: [845, 824],
    absenceLine: { left: 846.65, top: 1092.1 },
    implantLayout: { left: 836, top: 1073, width: 44, height: 133 }
  },
  {
    toothNumber: "34l",
    xCoords: [824, 814.5, 805],
    xinterCoords: [805, 787],
    absenceLine: { left: 802.65, top: 1092.1 },
    implantLayout: { left: 796, top: 1073, width: 40, height: 133 }
  },
  {
    toothNumber: "33l",
    xCoords: [787, 776.5, 766],
    xinterCoords: [766, 748],
    absenceLine: { left: 769.15, top: 1092.1 },
    implantLayout: { left: 759, top: 1073, width: 37, height: 133 }
  },
  {
    toothNumber: "32l",
    xCoords: [748, 738, 728],
    xinterCoords: [728, 714],
    absenceLine: { left: 731.65, top: 1092.1 },
    implantLayout: { left: 724, top: 1073, width: 35, height: 133 }
  },
  {
    toothNumber: "31l",
    xCoords: [714, 704.5, 695],
    xinterCoords: [0, 0],
    absenceLine: { left: 697.65, top: 1092.1 },
    implantLayout: { left: 680, top: 1073, width: 44, height: 133 }
  },
];

export enum Mode {
  PD = "PD",
  GM = "GM",
  CAL = "CAL",
  INTER = "INTER",
}

export enum Quadrants {
  Q1B = "Q1B",
  Q2B = "Q2B",
  Q1P = "Q1P",
  Q2P = "Q2P",
  Q3L = "Q3L",
  Q4L = "Q4L",
  Q3B = "Q3B",
  Q4B = "Q4B",
}
