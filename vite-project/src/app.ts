namespace fl {
  export interface ISprite {
    parent: ISprite | null
    html: HTMLElement | null
    setStyle(property: string, value: string | null): void
    init(): HTMLElement
    addChild(child: ISprite): void
  }

  export class Sprite implements ISprite {
    public html: HTMLElement | null = null
    public children: ISprite[] = []
    public parent: ISprite | null = null
    private _x: number = 0
    private _y: number = 0
    private _width: number = 0
    private _height: number = 0

    constructor() {
      this.html = this.init()
    }

    public set x(value: number) {
      this._x = value
    }

    public setStyle(property: string, value: string | null): void {
      ;(this.html!.style as any)[property as string] = value
    }

    public set y(value: number) {
      this._y = value
    }

    public get x(): number {
      return this._x
    }

    public get y(): number {
      return this._y
    }

    public set width(value: number) {
      this._width = value
    }

    public set height(value: number) {
      this._height = value
    }

    public get height(): number {
      return this._height
    }

    public get width(): number {
      return this._width
    }

    public init(): HTMLElement {
      const sprite = document.createElement('div')
      sprite.style.position = 'absolute'
      return sprite
    }

    public addChild(child: ISprite) {
      child.parent = this
      this.children.push(child)
      this.html!.appendChild(child.html!)
    }
  }

  export class Button extends Sprite {
    private _label: string = ''

    constructor() {
      super()
    }

    public get label(): string {
      return this._label
    }

    public set label(value: string) {
      this._label = value
      this.html!.innerText = value
    }

    public override init(): HTMLElement {
      const button = document.createElement('button')
      //button.setAttribute('role', 'button')
      //button.setAttribute('baseType', 'fl.Button')

      button.style.border = 'none'
      button.style.borderRadius = '6px'
      button.style.outline = 'none'
      button.setAttribute('baseType', 'fl.Button')
      button.style.cursor = 'pointer'
      return button
    }
  }

  export class TextField extends Sprite {
    private _text: string = ''

    constructor() {
      super()
    }

    public get text(): string {
      return this._text
    }

    public set text(value: string) {
      this._text = value
      this.html!.innerText = value
    }

    public override init(): HTMLElement {
      const label = document.createElement('label')
      //button.setAttribute('role', 'button')
      //button.setAttribute('baseType', 'fl.Button')
      label.style.cursor = 'text'
      label.style.fontFamily = 'sans-serif'
      return label
    }
  }
}

const stage = new fl.Sprite()
document.body.appendChild(stage.html!)

export function loadUI(data: any) {
  const root = stage
  root.setStyle('backgroundColor', data.stage.backgroundColor)
  root.width = data.stage.width
  root.height = data.stage.height

  for (const child of data.stage.children) {
    buildElement(child, root)
  }
  import('./style.css')
}

function buildElement(child: any, parent: fl.ISprite): void {
  let element: fl.ISprite | null = null

  if (!child) {
    return
  }

  if (child.type === 'Button') {
    element = new fl.Button()
    ;(element as unknown as fl.Button).label = child.label
  }

  if (child.type === 'Sprite') {
    element = new fl.Sprite()
  }

  if (child.type === 'TextField') {
    element = new fl.TextField()
    ;(element as fl.TextField).text = child.text
  }

  element!.setStyle('backgroundColor', child.backgroundColor)
  element!.setStyle('left', child.x)
  element!.setStyle('top', child.y)
  element!.setStyle('width', child.width)
  element!.setStyle('height', child.height)

  element!.setStyle('color', child.color)

  element!.setStyle('position', 'absolute')

  parent.addChild(element!)

  // Recursion
  if (child.children) {
    for (const subChild of child.children) {
      buildElement(subChild, element!)
    }
  }
}
