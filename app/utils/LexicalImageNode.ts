import {
  $applyNodeReplacement,
  DecoratorNode,
  type DOMConversionMap,
  type DOMExportOutput,
  type EditorConfig,
  type LexicalEditor,
  type NodeKey,
  type SerializedLexicalNode
} from 'lexical'

interface SerializedImageNode extends SerializedLexicalNode {
  src: string
  alt: string
  width: string | null
  height: string | null
}

export class LexicalImageNode extends DecoratorNode<null> {
  __src: string
  __alt: string
  __width: string | null
  __height: string | null

  static override getType(): string {
    return 'image'
  }

  static override clone(node: LexicalImageNode): LexicalImageNode {
    return new LexicalImageNode(node.__src, node.__alt, node.__width, node.__height, node.__key)
  }

  static override importDOM(): DOMConversionMap {
    return {
      img: (element) => ({
        conversion: () => {
          const image = element as HTMLImageElement
          return {
            node: $createImageNode(
              image.getAttribute('src') || '',
              image.getAttribute('alt') || '',
              image.getAttribute('width'),
              image.getAttribute('height')
            )
          }
        },
        priority: 1
      })
    }
  }

  static override importJSON(serializedNode: Record<string, unknown>): LexicalImageNode {
    return $createImageNode(
      typeof serializedNode.src === 'string' ? serializedNode.src : '',
      typeof serializedNode.alt === 'string' ? serializedNode.alt : '',
      typeof serializedNode.width === 'string' ? serializedNode.width : null,
      typeof serializedNode.height === 'string' ? serializedNode.height : null
    )
  }

  constructor(
    src: string,
    alt = '',
    width: string | null = null,
    height: string | null = null,
    key?: NodeKey
  ) {
    super(key)
    this.__src = src
    this.__alt = alt
    this.__width = width
    this.__height = height
  }

  override createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const image = document.createElement('img')
    this.applyAttributes(image)
    return image
  }

  override updateDOM(previousNode: this, dom: HTMLElement): boolean {
    if (
      this.__src !== previousNode.__src ||
      this.__alt !== previousNode.__alt ||
      this.__width !== previousNode.__width ||
      this.__height !== previousNode.__height
    ) {
      this.applyAttributes(dom as HTMLImageElement)
    }
    return false
  }

  override exportDOM(_editor: LexicalEditor): DOMExportOutput {
    const image = document.createElement('img')
    this.applyAttributes(image)
    return { element: image }
  }

  override exportJSON(): SerializedImageNode {
    return {
      ...super.exportJSON(),
      type: 'image',
      version: 1,
      src: this.__src,
      alt: this.__alt,
      width: this.__width,
      height: this.__height
    }
  }

  override decorate(): null {
    return null
  }

  override isInline(): boolean {
    return true
  }

  override getTextContent(): string {
    return ''
  }

  private applyAttributes(image: HTMLImageElement) {
    image.setAttribute('src', this.__src)
    image.setAttribute('alt', this.__alt)
    if (this.__width) image.setAttribute('width', this.__width)
    else image.removeAttribute('width')
    if (this.__height) image.setAttribute('height', this.__height)
    else image.removeAttribute('height')
  }
}

export function $createImageNode(
  src: string,
  alt = '',
  width: string | null = null,
  height: string | null = null
): LexicalImageNode {
  return $applyNodeReplacement(new LexicalImageNode(src, alt, width, height))
}
