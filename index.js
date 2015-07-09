class Layer {
  _parent: HTMLElement;
  _el: HTMLElement;
  _active: boolean;
  _childLayers: Layer[];

  constructor(parent: Layered) {
    this._parent = parent;
    this._el = document.createElement('div');
    this._el.style.position = 'absolute';
    this._el.style.top = 0;
    this._el.style.left = 0;
    this._active = true;
  }

  remove(): void {
    var i;
    for (i = 0; i < this._parent._childLayers.length; i++) {
      let l = this._parent._childLayers[i];
      if (l === this) {
        this._parent.removeLayer(i);
      }
    }
  }

  hide(): void {
    this._active = false;
    this._el.style.visibility = 'hidden';
  }

  show(): void {
    this._active = true;
    this._el.style.visibility = 'visible';
  }

  getElement(): HTMLElement {
    return this._el;
  }
}

class Layered {
  _container: HTMLElement;
  constructor(container) {
    this._container = container;
    this._childLayers = [];
  }

  addLayer() {
    let layer = new Layer(this);
    this._childLayers.push(layer);
    this._container.insertBefore(layer.getElement(), this._container.firstChild);
    this._reIndexLayers();
    return layer;
  }

  removeLayer(index): void {
    let layer = this._childLayers[index];
    layer.getElement().remove();
    this._childLayers = this._childLayers.filter(l => l !== layer)
    this._reIndexLayers();
  }

  getLayer(index: number): Layer {
    return this._childLayers[index];
  }

  getLayers(): Layer[] {
    return this._childLayers;
  }

  getActiveLayers(): Layer[] {
    return this._childLayers.filter(l => l._active);
  }

  _reIndexLayers(): void {
    this._childLayers.forEach((l, index) => {
      l.index = index + 1;
      l.getElement().style.zIndex = index + 1;
    });
  }
}

module.exports = Layered;
