var fs = require('fs');
var PNGDiff = require('../');

var image2Stream = fs.createReadStream('2.png');
PNGDiff.outputDiff('1.png', image2Stream, 'diffOutput.png', function(err, diffMetric) {
  if (err) throw err;
  // returns 0 if every pixel's the same; return 1 otherwise. Currently, these
  // are the only two possible metric values; possiblity to tweak them in the
  // future
  console.log(diffMetric === 1 ? 'Difference detected.' : 'No difference');
  // highlights the difference in red
  console.log('Diff saved!');
});

var image1Buffer = fs.createReadStream('1.png');
PNGDiff.outputDiffStream(image1Buffer, '2.png', function(err, outputStream, diffMetric) {
  if (err) throw err;

  if (diffMetric === 0) {
    console.log('No difference, no need to output diff result.');
    return;
  }
  outputStream.pipe(fs.createWriteStream('diffOutput2.png'));
});
