import { NgDeviceReportPage } from './app.po';

describe('ng-device-report App', function() {
  let page: NgDeviceReportPage;

  beforeEach(() => {
    page = new NgDeviceReportPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
