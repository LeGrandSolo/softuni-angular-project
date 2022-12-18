import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appShowInFront]',
})
export class ShowInFrontDirective {
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  @Input('hover-class') hoverClass: any;
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.addClass(this.elRef.nativeElement, this.hoverClass);
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeClass(this.elRef.nativeElement, this.hoverClass);
  }
}
