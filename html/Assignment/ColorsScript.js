const cssColors = [
    "AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black",
    "BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse",
    "Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue",
    "DarkCyan","DarkGoldenRod","DarkGray","DarkGreen","DarkKhaki","DarkMagenta",
    "DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen",
    "DarkSlateBlue","DarkSlateGray","DarkTurquoise","DarkViolet","DeepPink",
    "DeepSkyBlue","DimGray","DodgerBlue","FireBrick","FloralWhite","ForestGreen",
    "Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Green","GreenYellow",
    "HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush",
    "LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow",
    "LightGray","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue",
    "LightSlateGray","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen",
    "Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple",
    "MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise",
    "MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite",
    "Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod",
    "PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink",
    "Plum","PowderBlue","Purple","RebeccaPurple","Red","RosyBrown","RoyalBlue",
    "SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue",
    "SlateBlue","SlateGray","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle",
    "Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"
  ];
  
  const colorsContainer = document.getElementById("colorsContainer");
  const showColorsBtn = document.getElementById("showColors");
  const toggleThemeBtn = document.getElementById("toggleTheme");
  let colorsVisible = false;
  
  // Show colors when button is clicked
  showColorsBtn.addEventListener("click", () => {
    if (!colorsVisible) {
      cssColors.forEach(color => {
        const btn = document.createElement("div");
        btn.className = "color-btn";
        btn.style.backgroundColor = color;
        btn.textContent = color;
        colorsContainer.appendChild(btn);
      });
      colorsVisible = true;
      showColorsBtn.disabled = true;
    }
  });
  
  // Toggle dark theme
  toggleThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
  