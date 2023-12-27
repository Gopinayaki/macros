import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QueryBuilderPage } from './query-builder.page';

describe('QueryBuilderPage', () => {
  let component: QueryBuilderPage;
  let fixture: ComponentFixture<QueryBuilderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QueryBuilderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
