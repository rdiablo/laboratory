import * as d3 from 'd3';
import {approximatelyEquals} from './math';

function lineTo(g, x1, y1, x2, y2, lineWidth, strokeStyle, dash) {
  let sta = [x1, y1];
  let end = [x2, y2];
  let lineGenerator = d3.line().x(d => d[0]).y(d => d[1]);
  //.curve(d3.curveBundle.beta(1))
  // let radius = 6;
  const points = [
    sta,
    end
  ];
  let path = g.append('path').
      attr('stroke', strokeStyle).
      attr('stroke-width', lineWidth).
      attr('fill', 'none').
      attr('d', lineGenerator(points));
  if (dash) {
    path.style('stroke-dasharray', dash.join(','));
  }
  return path;
}
function deleteNum(str){
  if (str == null) {
    return str;
  } else {
    let reg = /[0-9]+/g;
    let str1 = str.replace(reg,"");
    return str1;
  }
}

function line2(g, x1, y1, x2, y2, startPosition, endPosition, lineWidth,
    strokeStyle, markered, txt) {
      startPosition = deleteNum(startPosition);
      endPosition = deleteNum(endPosition);
  let points = [];
  let start = [x1, y1];
  let end = [x2, y2];
  let centerX = start[0] + (end[0] - start[0]) / 2;
  let centerY = start[1] + (end[1] - start[1]) / 2;
  let second;
  let addVerticalCenterLine = function() {
    let third = [centerX, second[1]];
    let forth = [centerX, penult[1]];
    points.push(third);
    points.push(forth);
  };
  let addHorizontalCenterLine = function() {
    let third = [second[0], centerY];
    let forth = [penult[0], centerY];
    points.push(third);
    points.push(forth);
  };
  let addHorizontalTopLine = function() {
    points.push([second[0], start[1] - 50]);
    points.push([penult[0], start[1] - 50]);
  };
  let addHorizontalBottomLine = function() {
    points.push([second[0], start[1] + 50]);
    points.push([penult[0], start[1] + 50]);
  };
  let addVerticalRightLine = function() {
    points.push([start[0] + 80, second[1]]);
    points.push([start[0] + 80, penult[1]]);
  };
  let addVerticalLeftLine = function() {
    points.push([start[0] - 80, second[1]]);
    points.push([start[0] - 80, penult[1]]);
  };
  let addSecondXPenultY = function() {
    points.push([second[0], penult[1]]);
  };
  let addPenultXSecondY = function() {
    points.push([penult[0], second[1]]);
  };
  switch (startPosition) {
    case 'left':
      second = [start[0] - 30, start[1]];
      break;
    case 'top':
      second = [start[0], start[1] - 30];
      break;
    case 'bottom':
      second = [start[0], start[1] + 30];
      break;
    default:
      second = [start[0] + 30, start[1]];
      break;
  }
  let penult = null;
  switch (endPosition) {
    case 'right':
      penult = [end[0] + 30, end[1]];
      break;
    case 'top':
      penult = [end[0], end[1] - 30];
      break;
    case 'bottom':
      penult = [end[0], end[1] + 30];
      break;
    default:
      penult = [end[0] - 30, end[1]];
      break;
  }
  points.push(start);
  points.push(second);
  startPosition = startPosition || 'right';
  endPosition = endPosition || 'left';
  let direction = getDirection(x1, y1, x2, y2);
  if (direction.indexOf('r') > -1) {
    if (startPosition === 'right' || endPosition === 'left') {
      if (second[0] > centerX) {
        second[0] = centerX;
      }
      if (penult[0] < centerX) {
        penult[0] = centerX;
      }
    }
  }
  if (direction.indexOf('d') > -1) {
    if (startPosition === 'bottom' || endPosition === 'top') {
      if (second[1] > centerY) {
        second[1] = centerY;
      }
      if (penult[1] < centerY) {
        penult[1] = centerY;
      }
    }
  }
  if (direction.indexOf('l') > -1) {
    if (startPosition === 'left' || endPosition === 'right') {
      if (second[0] < centerX) {
        second[0] = centerX;
      }
      if (penult[0] > centerX) {
        penult[0] = centerX;
      }
    }
  }
  if (direction.indexOf('u') > -1) {
    if (startPosition === 'top' || endPosition === 'bottom') {
      if (second[1] < centerY) {
        second[1] = centerY;
      }
      if (penult[1] > centerY) {
        penult[1] = centerY;
      }
    }
  }
  switch (direction) {
    case 'lu': {
      if (startPosition === 'right') {
        switch (endPosition) {
          case 'top':
          case 'right':
            addSecondXPenultY();
            break;
          default: {
            addHorizontalCenterLine();
            break;
          }
        }
      } else if (startPosition === 'bottom') {
        switch (endPosition) {
          case 'top':
            addVerticalCenterLine();
            break;
          default: {
            addPenultXSecondY();
            break;
          }
        }
      } else if (startPosition === 'top') {
        switch (endPosition) {
          case 'top':
          case 'right':
            addSecondXPenultY();
            break;
          default: {
            addHorizontalCenterLine();
            break;
          }
        }
      } else {
        // startPosition is left
        switch (endPosition) {
          case 'top':
          case 'right':
            addVerticalCenterLine();
            break;
          default: {
            addPenultXSecondY();
            break;
          }
        }
      }
      break;
    }
    case 'u':
      if (startPosition === 'right') {
        switch (endPosition) {
          case 'right': {
            break;
          }
          case 'top': {
            addSecondXPenultY();
            break;
          }
          default: {
            addHorizontalCenterLine();
            break;
          }
        }
      } else if (startPosition === 'bottom') {
        switch (endPosition) {
          case 'left':
          case 'right':
            addPenultXSecondY();
            break;
          default: {
            addVerticalRightLine();
            break;
          }
        }
      } else if (startPosition === 'top') {
        switch (endPosition) {
          case 'left': {
            addPenultXSecondY();
            break;
          }
          case 'right': {
            addHorizontalCenterLine();
            break;
          }
          case 'top':
            addVerticalRightLine();
            break;
          default: {
            break;
          }
        }
      } else {
        // left
        switch (endPosition) {
          case 'left':
          case 'right':
            break;
          default: {
            points.push([second[0], penult[1]]);
            break;
          }
        }
      }
      break;
    case 'ru':
      if (startPosition === 'right') {
        switch (endPosition) {
          case 'left': {
            addVerticalCenterLine(); //aaa
            break;
          }
          case 'top': {
            addSecondXPenultY();
            break;
          }
          default: {
            addPenultXSecondY();
            break;
          }
        }
      } else if (startPosition === 'bottom') {
        switch (endPosition) {
          case 'top': {
            addVerticalCenterLine();
            break;
          }
          default: {
            addPenultXSecondY();
            break;
          }
        }
      } else if (startPosition === 'top') {
        switch (endPosition) {
          case 'right': {
            addVerticalCenterLine();
            break;
          }
          default: {
            addSecondXPenultY();
            break;
          }
        }
      } else {
        // left
        switch (endPosition) {
          case 'left':
          case 'top':
            addSecondXPenultY();
            break;
          default: {
            addHorizontalCenterLine();
            break;
          }
        }
      }
      break;
    case 'l':
      if (startPosition === 'right') {
        switch (endPosition) {
          case 'left':
          case 'right':
          case 'top':
            addHorizontalTopLine();
            break;
          default: {
            addHorizontalBottomLine();
            break;
          }
        }
      } else if (startPosition === 'bottom') {
        switch (endPosition) {
          case 'left': {
            addHorizontalBottomLine();
            break;
          }
          case 'right': {
            addSecondXPenultY();
            break;
          }
          case 'top': {
            addVerticalCenterLine();
            break;
          }
          default: {
            break;
          }
        }
      } else if (startPosition === 'top') {
        switch (endPosition) {
          case 'left': {
            addHorizontalTopLine();
            break;
          }
          case 'right': {
            addSecondXPenultY();
            break;
          }
          case 'top': {
            break;
          }
          default: {
            addVerticalCenterLine();
            break;
          }
        }
      } else {
        // left
        switch (endPosition) {
          case 'left': {
            addHorizontalTopLine();
            break;
          }
          case 'right': {
            break;
          }
          default: {
            addSecondXPenultY();
            break;
          }
        }
      }
      break;
    case 'r':
      if (startPosition === 'right') {
        switch (endPosition) {
          case 'left': {
            break;
          }
          case 'right': {
            addHorizontalTopLine();
            break;
          }
          default: {
            addSecondXPenultY();
            break;
          }
        }
      } else if (startPosition === 'bottom') {
        switch (endPosition) {
          case 'left': {
            addSecondXPenultY();
            break;
          }
          case 'right': {
            addHorizontalBottomLine();
            break;
          }
          case 'top': {
            addVerticalCenterLine();
            break;
          }
          default: {
            break;
          }
        }
      } else if (startPosition === 'top') {
        switch (endPosition) {
          case 'left': {
            addPenultXSecondY();
            break;
          }
          case 'right': {
            addHorizontalTopLine();
            break;
          }
          case 'top': {
            break;
          }
          default: {
            addVerticalCenterLine();
            break;
          }
        }
      } else {
        // left
        switch (endPosition) {
          case 'left':
          case 'right':
          case 'top':
            addHorizontalTopLine();
            break;
          default: {
            addHorizontalBottomLine();
            break;
          }
        }
      }
      break;
    case 'ld':
      if (startPosition === 'right') {
        switch (endPosition) {
          case 'left': {
            addHorizontalCenterLine();
            break;
          }
          default: {
            addSecondXPenultY();
            break;
          }
        }
      } else if (startPosition === 'bottom') {
        switch (endPosition) {
          case 'left': {
            addPenultXSecondY();
            break;
          }
          case 'top': {
            addHorizontalCenterLine();
            break;
          }
          default: {
            addSecondXPenultY();
            break;
          }
        }
      } else if (startPosition === 'top') {
        switch (endPosition) {
          case 'left':
          case 'right':
          case 'top':
            addPenultXSecondY();
            break;
          default: {
            addVerticalCenterLine();
            break;
          }
        }
      } else {
        // left
        switch (endPosition) {
          case 'left':
          case 'top':
            addPenultXSecondY();
            break;
          case 'right': {
            addVerticalCenterLine();
            break;
          }
          default: {
            addSecondXPenultY();
            break;
          }
        }
      }
      break;
    case 'd':
      if (startPosition === 'right') {
        switch (endPosition) {
          case 'left': {
            addHorizontalCenterLine();
            break;
          }
          case 'right': {
            addPenultXSecondY();
            break;
          }
          case 'top': {
            addSecondXPenultY();
            break;
          }
          default: {
            addVerticalRightLine();
            break;
          }
        }
      } else if (startPosition === 'bottom') {
        switch (endPosition) {
          case 'left':
          case 'right':
            addPenultXSecondY();
            break;
          case 'top': {
            break;
          }
          default: {
            addVerticalRightLine();
            break;
          }
        }
      } else if (startPosition === 'top') {
        switch (endPosition) {
          case 'left': {
            addVerticalLeftLine();
            break;
          }
          default: {
            addVerticalRightLine();
            break;
          }
        }
      } else {
        // left
        switch (endPosition) {
          case 'left': {
            break;
          }
          case 'right': {
            addHorizontalCenterLine();
            break;
          }
          case 'top': {
            addSecondXPenultY();
            break;
          }
          default: {
            addVerticalLeftLine();
            break;
          }
        }
      }
      break;
    case 'rd': {
      if (startPosition === 'right' && endPosition === 'left') {
        addVerticalCenterLine(); //ok
      } else if (startPosition === 'right' && endPosition === 'bottom') {
        addSecondXPenultY();
      } else if (
          (startPosition === 'right' && endPosition === 'top') ||
          (startPosition === 'right' && endPosition === 'right')
      ) {
        addPenultXSecondY();
      } else if (startPosition === 'bottom' && endPosition === 'left') {
        addSecondXPenultY();
      } else if (startPosition === 'bottom' && endPosition === 'right') {
        addPenultXSecondY();
      } else if (startPosition === 'bottom' && endPosition === 'top') {
        addHorizontalCenterLine();
      } else if (startPosition === 'bottom' && endPosition === 'bottom') {
        addSecondXPenultY();
      } else if (startPosition === 'top' && endPosition === 'left') {
        addPenultXSecondY();
      } else if (startPosition === 'top' && endPosition === 'right') {
        addPenultXSecondY();
      } else if (startPosition === 'top' && endPosition === 'top') {
        addPenultXSecondY();
      } else if (startPosition === 'top' && endPosition === 'bottom') {
        addVerticalCenterLine();
      } else if (startPosition === 'left' && endPosition === 'left') {
        addSecondXPenultY();
      } else if (startPosition === 'left' && endPosition === 'right') {
        addHorizontalCenterLine();
      } else if (startPosition === 'left' && endPosition === 'top') {
        addHorizontalCenterLine();
      } else if (startPosition === 'left' && endPosition === 'bottom') {
        addSecondXPenultY();
      }
      break;
    }
  }
  points.push(penult);
  points.push(end);

  let lines = [];
  let paths = [];
  for (let i = 0; i < points.length; i++) {
    let source = points[i];
    let destination = points[i + 1];
    let dss;
    if (i - 1 > 0) {
      dss = points[i - 1];
    } else {
      dss = points[i];
    }
    lines.push({
      sourceX: source[0],
      sourceY: source[1],
      destinationX: destination[0],
      destinationY: destination[1],
      ssX: dss[0],
    });
    let finish = i === points.length - 2;
    if (finish && markered) {
      let path = arrowTo(g, source[0], source[1], destination[0],
          destination[1], lineWidth, strokeStyle, dss[0], dss[1], txt);
      paths.push(path);
      break;
    } else {
      let path = lineTo(g, source[0], source[1], destination[0], destination[1],
          lineWidth, strokeStyle);
      paths.push(path);
    }
    if (finish) {
      break;
    }
  }
  return {lines, paths};
}

function arrowTo(g, x1, y1, x2, y2, lineWidth, strokeStyle, x0, y0, txt) {
  let path = lineTo(g, x1, y1, x2, y2, lineWidth, strokeStyle);
  const id = 'arrow' + strokeStyle.replace('#', '');
  let text = txt;
  let tlength = 0;
  if (txt) tlength = txt.length
  let textxy = x0/2 - (x2/2 - x1) - (tlength * 6/2);
  let conntext = g.append('text').attr('stroke', 'white').attr('stroke-width', '3.5').
  attr('class', 'unselectable').text(function () {
    return text;
  });
  let conntextss = g.append('text').
  attr('class', 'unselectable').text(function () {
    return text;
  });
  if(y1 == y2 || y0 == y1) {
    conntext.attr('x', textxy)
    conntext.attr('y', y1+4)
    conntextss.attr('x', textxy)
    conntextss.attr('y', y1+4)
  } else {
    conntext.attr('x', textxy)
    conntext.attr('y', y0+4)
    conntextss.attr('x', textxy)
    conntextss.attr('y', y0+4)
  }
  g.append('marker').
      attr('id', id).
      attr('markerUnits', 'strokeWidth').
      attr('viewBox', '0 0 12 12').
      attr('refX', 9).
      attr('refY', 6).
      attr('markerWidth', 12).
      attr('markerHeight', 12).
      attr('orient', 'auto').
      append('path').
      // attr('d', 'M2,2 L10,6 L2,10 L6,6 L2,2').
      attr('d', 'M2,2 L2,10 L10,6 L2,2').
      
      attr('fill', strokeStyle);
  path.attr('marker-end', 'url(#' + id + ')');
  return path;
}

function getDirection(x1, y1, x2, y2) {
  // Use approximatelyEquals to fix the problem of css position presicion
  if (x2 < x1 && approximatelyEquals(y2, y1)) {
    return 'l';
  }
  if (x2 > x1 && approximatelyEquals(y2, y1)) {
    return 'r';
  }
  if (approximatelyEquals(x2, x1) && y2 < y1) {
    return 'u';
  }
  if (approximatelyEquals(x2, x1) && y2 > y1) {
    return 'd';
  }
  if (x2 < x1 && y2 < y1) {
    return 'lu';
  }
  if (x2 > x1 && y2 < y1) {
    return 'ru';
  }
  if (x2 < x1 && y2 > y1) {
    return 'ld';
  }
  return 'rd';
}

export {
  arrowTo,
  lineTo,
  getDirection,
  line2,
};
