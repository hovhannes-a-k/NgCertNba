import {
  ApplicationRef,
  ComponentRef, createComponent, Inject,
  Injectable,
  Injector,
  TemplateRef, Type
} from '@angular/core';
import {ModalComponent} from "../components/modal/modal.component";
import {Observable, Subject} from "rxjs";
import {DOCUMENT} from "@angular/common";

@Injectable()
export class ModalService {
  private componentRef!: ComponentRef<ModalComponent>;
  private componentSubscriber!: Subject<string>;
  constructor(
    private readonly appRef: ApplicationRef,
    private readonly injector: Injector,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {}

  openModal<T>(content: any): Observable<any> {
    const ngContent = this.resolveNgContent(content);
    this.componentRef = createComponent(
      ModalComponent,
      {environmentInjector: this.appRef.injector, elementInjector: this.injector, projectableNodes: ngContent}
    );
    this.document.body.appendChild(this.componentRef.location.nativeElement);
    this.componentSubscriber = new Subject<string>();
    return this.componentSubscriber.asObservable();
  }

  resolveNgContent<T>(content: Type<T>): Node[][] {
    if (typeof content === 'string') {
      const element = this.document.createTextNode(content);
      return [[element]];
    }

    if (content instanceof TemplateRef) {
      const viewRef = content.createEmbeddedView(null);
      return [viewRef.rootNodes];
    }

    const componentRef = createComponent(content, {environmentInjector: this.appRef.injector, elementInjector: this.injector});
    return [[componentRef.location.nativeElement]];
  }

  closeModal(): void {
    const modal = this.componentRef.location.nativeElement;
    modal.parentNode.removeChild(modal);
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }

  confirm(message = ''): void {
    this.componentSubscriber.next(message);
    this.closeModal();
  }
}
