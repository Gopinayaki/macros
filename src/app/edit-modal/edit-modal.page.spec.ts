import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EditModalPage } from './edit-modal.page';

describe('EditModalPage', () => {
  let component: EditModalPage;
  let fixture: ComponentFixture<EditModalPage>;

  beforeEach(waitForAsync () => {
    fixture = TestBed.createComponent(EditModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
