function CallData() {
  this.getListData = () => {
    return $.getJSON("./../data/Data.json");
  };
}
