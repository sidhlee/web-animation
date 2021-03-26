const $strokeInput = $('#dasharray-stroke');
const $gapInput = $('#dasharray-gap');
const $offsetInput = $('#dashoffset');
const $strokeDisplay = $('.display__stroke');
const $gapDisplay = $('.display__gap');
const $offsetDisplay = $('.display__offset');
const $svgGraphicsElements = $('.svg-graphic');

$strokeInput.on('input', handleStrokeInput);
$gapInput.on('input', handleGapInput);
$offsetInput.on('input', handleOffsetInput);

function handleStrokeInput() {
  const value = $(this).val();
  update({ stroke: value });
}

function handleGapInput() {
  const value = $(this).val();
  update({ gap: value });
}
function handleOffsetInput() {
  const value = $(this).val();
  update({ offset: value });
}

function updateDisplay({ stroke, gap, offset }) {
  if (stroke) {
    $strokeDisplay.text(stroke + '%');
  }

  if (gap) {
    $gapDisplay.text(gap + '%');
  }

  if (offset) {
    $offsetDisplay.text(offset + '%');
  }
}

function updateSvg({ stroke, gap, offset }) {
  const strokeDasharray = $svgGraphicsElements
    .css('strokeDasharray')
    .split(',');

  if (stroke) {
    $svgGraphicsElements.css(
      'strokeDasharray',
      `${stroke}%, ${strokeDasharray[1]}` // % value refers to the % of viewport
    );
  }
  if (gap) {
    $svgGraphicsElements.css(
      'strokeDasharray',
      `${strokeDasharray[0]}, ${gap}%`
    );
  }
  if (offset) {
    $svgGraphicsElements.css('strokeDashoffset', `${offset}%`);
  }
}

function update(dto) {
  updateDisplay(dto);
  updateSvg(dto);
}
