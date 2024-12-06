// Buffer converter function from https://gist.github.com/miguelmota/5b06ae5698877322d0ca

function toArrayBuffer(buffer) {
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
}

module.exports = toArrayBuffer;