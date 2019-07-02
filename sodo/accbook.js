var initialbudget = 30000;
var orgdata = [
            ['種類', '個数'],
            ['食費', 0],
            ['交通費', 0],
            ['日用品', 0],
            ['交際費', 0],
            ['趣味・娯楽', 0],
            ['仕事・勉強', 500],
            ['住居費', 0],
            ['その他', 0]
];
var initialitem = [
      {
         orderitem: '書籍',
         ordercost: 500,
         orderdate: new Date(2019,5,29),
         ordercategory: '仕事・勉強',
         done: false
      }
];

function drawBasic() {
  var data = google.visualization.arrayToDataTable(orgdata);
  var options = {title: '費目別出費',"is3D": true};
  var chart = new google.visualization.PieChart(
    document.getElementById('chart_div'));
  chart.draw(data, options);
}

function drawBasic2(mydata) {
  var data = google.visualization.arrayToDataTable(mydata);
  var options = {title: '費目別出費',"is3D": true};
  var chart = new google.visualization.PieChart(
    document.getElementById('chart_div'));
  chart.draw(data, options);
}

function initial() {

google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawBasic);

const app = new Vue({
  el: '#app',
  data: {
    datepicked: new Date(),
    budget: initialbudget,
    addtext: '',
    addcost: 0,
    addcategory: '',
    items: initialitem,
    dataArray: orgdata
  },
  components: {
  	vuejsDatepicker
  },
  computed: {
	totalcost: function() {
          return this.items.reduce((p, x) => p + x.ordercost, 0);
	},
	reminder: function() {
          return this.budget - this.totalcost;
        }
  },
  methods: {
    addItem: function() {
      if (this.addtext) {
        this.items.push({done:false, orderitem:this.addtext, ordercost: this.addcost, orderdate:this.datepicked, ordercategory:this.addcategory});
        this.addtext = '';
        this.addcost = 0;
      }

      var newdataArray = [
            ['種類', '金額小計'],
            ['食費', this.items.filter(function(val){return val.ordercategory == '食費';}).reduce((p, x) => p + x.ordercost, 0)],
            ['交通費', this.items.filter(function(val){return val.ordercategory == '交通費';}).reduce((p, x) => p + x.ordercost, 0)],
            ['日用品', this.items.filter(function(val){return val.ordercategory == '日用品';}).reduce((p, x) => p + x.ordercost, 0)],
            ['交際費', this.items.filter(function(val){return val.ordercategory == '交際費';}).reduce((p, x) => p + x.ordercost, 0)],
            ['趣味・娯楽', this.items.filter(function(val){return val.ordercategory == '趣味・娯楽';}).reduce((p, x) => p + x.ordercost, 0)],
            ['仕事・勉強', this.items.filter(function(val){return val.ordercategory == '仕事・勉強';}).reduce((p, x) => p + x.ordercost, 0)],
            ['住居費', this.items.filter(function(val){return val.ordercategory == '住居費';}).reduce((p, x) => p + x.ordercost, 0)],
            ['その他', this.items.filter(function(val){return val.ordercategory == 'その他';}).reduce((p, x) => p + x.ordercost, 0)],
      ];
      this.dataArray = newdataArray;

      drawBasic2(this.dataArray);
    },

    cleanItem: function () {
      this.items = this.items.filter(function(val){
        return val.done == false;
      })
      var newdataArray = [
            ['種類', '金額小計'],
            ['食費', this.items.filter(function(val){return val.ordercategory == '食費';}).reduce((p, x) => p + x.ordercost, 0)],
            ['交通費', this.items.filter(function(val){return val.ordercategory == '交通費';}).reduce((p, x) => p + x.ordercost, 0)],
            ['日用品', this.items.filter(function(val){return val.ordercategory == '日用品';}).reduce((p, x) => p + x.ordercost, 0)],
            ['交際費', this.items.filter(function(val){return val.ordercategory == '交際費';}).reduce((p, x) => p + x.ordercost, 0)],
            ['趣味・娯楽', this.items.filter(function(val){return val.ordercategory == '趣味・娯楽';}).reduce((p, x) => p + x.ordercost, 0)],
            ['仕事・勉強', this.items.filter(function(val){return val.ordercategory == '仕事・勉強';}).reduce((p, x) => p + x.ordercost, 0)],
            ['住居費', this.items.filter(function(val){return val.ordercategory == '住居費';}).reduce((p, x) => p + x.ordercost, 0)],
            ['その他', this.items.filter(function(val){return val.ordercategory == 'その他';}).reduce((p, x) => p + x.ordercost, 0)],
      ];
      this.dataArray = newdataArray;
      drawBasic2(this.dataArray);

    }
  }
})

}

