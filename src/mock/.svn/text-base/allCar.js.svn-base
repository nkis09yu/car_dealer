import { Random } from "mockjs";

//requesA.js
let demoList = {
    code: 0,
    message: 'success',
    data: {
        total: 100,
        'list|10': [{
            'id|+1': 0,
            'image': Random.image('200x100'),
            'city': '@city',
            'date1': '@date("yyyy")',
            'mileage|1-50': 5,
            'price|1-100': 10,
            'date2': '@date(yyyy/mm/dd)',
            'name|1': ['奔驰 C级 2019款 180L时尚型', '英菲尼迪 qx80 2013款 5.6L 4WD', '丰田 普拉多（平行进口） 2013款 2.7L 中东版', '奥迪 Q5 2012款 2.0TFSL 技术型'],
            'tags|1': ['准新车', '高保值', '一手家用', '单位用车', '全程4S店保养']
        }]
    }
};

export default {
    'post|/api/car/query': demoList,
}
