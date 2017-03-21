import { Component,OnInit,enableProdMode,ChangeDetectorRef} from '@angular/core';
import {nvD3} from 'ng2-nvd3'

enableProdMode();
declare var d3: any;
@Component({
  selector: 'app-root',
  template:`
    <div>
      <nvd3 [options]="options" [data]="data"></nvd3>
    </div>
  `,
  styles: [`
    * >>> .nv-axislabel{font-size: 20px ; fill:#ccc }
  `]
})
export class AppComponent{
  options;
  public data:any;
  chartType;
  ngOnInit(){  
    this.options = {
      chart: {
        type: 'multiChart',
        height: 450,
        margin : {
          top: 20,
          right: 100,
          bottom: 40,
          left: 55
        },
        interpolate:'basic',
        useInteractiveGuideline: true,
        x: function(d){ return d.x; },
        xAxis: {
          axisLabel: 'Month',
          tickFormat: function(d){
            return d3.time.format("%Y %b")(new Date(d))
          },
        },
        yAxis1: {
          axisLabel: 'Active & Inactive Devices',
          axisLabelDistance: -10,
        },
        yAxis2: {
          axisLabel: 'Total Devices',
          axisLabelDistance: -10
        }
      }
      
    };  
        
    this.data = this.getData();
  }
  constructor(private ref: ChangeDetectorRef) {
    ref.detach();
    setTimeout(() => {
      this.ref.detectChanges();
    }, 1500);
  }
  getData():any{
    
  var data = [],allDevice=[],activatedDevices=[],deactivatedDevices=[],newDevices=[],prediction=[];
  d3.csv("data2.csv", function(data) {
    prediction = data.map(function(obj){ 
      var rObj = {};
      var date = new Date(obj['month_no']+'/01/'+obj['year'])
      rObj['x'] = date.getTime();
      rObj['y'] = Number(obj['active']);
      return rObj;
    });
  });

  d3.csv("data1.csv", function(data) {
    allDevice = data.map(function(obj){ 
      var rObj = {};
      var date = new Date(obj['month_no']+'/01/'+obj['year'])
      rObj['x'] = date.getTime();
      rObj['y'] = Number(obj['total']);
      return rObj;
    });
    newDevices = data.map(function(obj){ 
      var rObj = {};
      var date = new Date(obj['month_no']+'/01/'+obj['year'])
      rObj['x'] = date.getTime() ;
      rObj['y'] = Number(obj['new added']);
      return rObj;
    });
    activatedDevices = data.map(function(obj){ 
      var rObj = {};
      var date = new Date(obj['month_no']+'/01/'+obj['year'])
      rObj['x'] = date.getTime() ;
      rObj['y'] = Number(obj['active']);
      return rObj;
    });
    deactivatedDevices = data.map(function(obj){ 
      var rObj = {};
      var date = new Date(obj['month_no']+'/01/'+obj['year'])
      rObj['x'] = date.getTime();
      rObj['y'] = Number(obj['inactive']);
      return rObj;
    });
  });
  data.push({id:'all',key:'All Devices',values:[],type:'line',yAxis:2});
  data.push({id:'active',key:'Active',values:[], type:'line',yAxis:1});
  data.push({id:'inactive',key:'Inactive',values:[], type:'line',yAxis:1});
  data.push({id:'new',key:'New Devices',values:[], type:'line',yAxis:1});
  data.push({id:'new',key:'Prediction',values:[], type:'line',yAxis:1});
  setTimeout(function() {
    data[0]['values'].push.apply(data[0]['values'],allDevice);
    data[1]['values'].push.apply(data[1]['values'],activatedDevices);
    data[2]['values'].push.apply(data[2]['values'],deactivatedDevices);
    data[3]['values'].push.apply(data[3]['values'],newDevices);
    data[4]['values'].push.apply(data[4]['values'],prediction);
  }, 1000);

  return data;
    }
}
