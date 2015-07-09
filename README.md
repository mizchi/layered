# Layered

Simple modal window manager.

## Example

```javascript
window.addEventListener('DOMContentLoaded', () => {
  let layered = new Layered(document.body);
  let layer1 = layered.addLayer();
  let layer2 = layered.addLayer();

  // touch elemenet
  layer1.getElement().innerHTML = 'foo';
  layer2.getElement().innerHTML = 'bar';

  layer2.hide();
  layer2.show();
  // layer2.remove();
  console.log(layered.getActiveLayers());
});
```

## LICENSE

MIT
