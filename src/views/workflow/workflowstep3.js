import React, { Component } from 'react';
import { PickerItem, Button, InputItems, List, Step, AtdToast } from '../../comps/index'
import './workflow.scss'
import { _HTTP, _setTitle, _stat } from '../../helper/helper'
import Qs from 'qs'

const cl = _HTTP.get('LoansPlatform/city_list')
let job = [
	[{
		value: 3,
		label: "个体/企业主",
	}, {
		value: 1,
		label: "上班族",
	}, {
		value: 2,
		label: "学生",
	}, {
		value: 4,
		label: "无固定职业/其他",
	}]
];
let degree =
	[{
		value: '00',
		label: "初中及以下",
	}, {
		value: '01',
		label: "高中",
	}, {
		value: '05',
		label: "中专",
	}, {
		value: '02',
		label: "大专"
	}, {
		value: '03',
		label: "本科"
	}, {
		value: '04',
		label: "硕士"
	}, {
		value: '06',
		label: "博士"
	}]


let industry =
	[{
		value: 1,
		label: "金融",
	}, {
		value: 2,
		label: "房地产/建筑",
	}, {
		value: 3,
		label: "互联网/计算机",
	}, {
		value: 4,
		label: "通讯"
	}, {
		value: 5,
		label: "服务/教育培训"
	}, {
		value: 6,
		label: "政府机关/非盈利机构"
	}, {
		value: 7,
		label: "制造业"
	}, {
		value: 8,
		label: "零售"
	}, {
		value: 9,
		label: "广告业"
	}, {
		value: 10,
		label: "贸易"
	}, {
		value: 11,
		label: "医疗"
	}, {
		value: 12,
		label: "物流/运输"
	}]

const httpdata = _HTTP.get("LoansDispatch/saveLoanInfo")
export default class WorkFlowStep3 extends Component {
	state = {
		job: [1],
		degree: [1], //学历
		industry: [1],
		district: [],
		districtdata: [],
		company: "",
		addressdetail: ""
		, mail: ""
		, income: ""
	};
	componentDidMount() {
		_setTitle("工作信息认证")
		cl.then(response => {
			if (response.data.code == 0) {
				this.setState({
					districtdata: [...response.data.data]
				})
			}
		})

		httpdata.then(response => {
			if (response.data.code == 0) {
				const data = response.data.data
				this.setState({
					company_name: data.company_name
					, mail: data.email
					, income: data.income
				})
			}
		})
	}
	render() {
		return (
			<div className="workflow step3">
				<Step step={3} />

				<List style={{ backgroundColor: 'white' }} className="picker-list">
					<PickerItem data={job}
						title="职业身份"
						cascade={false}
						value={this.state.job}
						onOk={v => {
							this.setState({ job: v })
							const refs = this.refs;
							if (v[0] == 2) {
								refs.industry.style.display = "none";
								refs.company.style.display = "none";
								refs.address.style.display = "none";
								refs.addressdetail.style.display = "none";
								refs.tel.style.display = "none";
								refs.income.style.display = "none";
							} else {
								refs.industry.style = "block";
								refs.company.style = "block";
								refs.address.style = "block";
								refs.addressdetail.style = "block";
								refs.tel.style = "block";
								refs.income.style = "block";
							}
						}}
						cols={1} />
					<PickerItem data={degree}
						title="学历"

						value={this.state.degree}
						// onChange={v => this.setState({ degree: v })}
						onOk={v => this.setState({ degree: v })}
						cols={1} />
					<div ref="industry">
						<PickerItem data={industry}
							title="所属行业"
							value={this.state.industry}
							onOk={v => this.setState({ industry: v })}
							cols={1}
						/></div>
					<div ref="company">
						<InputItems label="公司名称" ref="companyvalue" placeholder="请输入公司全称"
							//  onChange={(e)=>{this.setState({company: e.value})}} 
							ref="companyvalue"
							value={this.state.company_name}
							onChange={value => {
								this.setState({
									company_name: value
								})
							}}
						/>
					</div>
					<div ref="address">
						<PickerItem data={this.state.districtdata}
							title="公司地址"
							value={this.state.district}
							onOk={e => {
								this.setState({
									district: e
								})
							}}
							onDismiss={e => console.log('dismiss', e)}
						/>
					</div>
					<div ref="addressdetail">
						<InputItems label="详细地址" placeholder="街道、楼牌号等" maxLength="19" ref="addressdetailvalue" value={this.state.company_address}
							onChange={value => {
								this.setState({
									company_address: value
								})
							}} />
					</div>
					<div ref="tel">
						<InputItems label="公司电话" dou={true} first={{ placeholder: "区号", type: "tel", maxLength: "4" }} second={{ placeholder: "固话号码", type: "tel", maxLength: "8" }}
							ref="telvalue"
						/>
					</div>
					<div ref="income" >
						<InputItems label="月收入" placeholder="输入金额" type="number" ref="incomevalue" value={this.state.income}
							onChange={value => {
								this.setState({
									income: value
								})
							}} />
					</div>
					<InputItems label="工作邮箱" placeholder="输入工作邮箱" ref="email" ref="emailvalue" value={this.state.mail}
						onChange={value => {
							this.setState({
								mail: value
							})
						}} />
				</List>
				<div className="wrap">
					<Button onClick={() => {
						_stat("工作信息下一步被点击","loan-wf3v1")
						const refs = this.refs;
						let postdata = {
							work_type: this.state.job[0],
							degree: this.state.degree[0],

							work_email: refs.emailvalue.getvalue()
						}
						// console.log( refs.companyvalue.getvalue())
						if (postdata.work_type != 2) {
							postdata = {
								...postdata,
								work_attribute: this.state.industry[0],
								company_name: refs.companyvalue.getvalue(),
								company_address: this.state.district.toString(),
								company_detail_address: refs.addressdetailvalue.getvalue(),
								income: refs.incomevalue.getvalue(),
								company_phone: refs.telvalue.getvalue(),
							}
							if (postdata.company_name.length < 3 || postdata.company_name.length > 40) {
								AtdToast.fail("公司名称有误，请重新输入")
								return false
							}

							const result = postdata.company_detail_address.match(/(号|区|路|镇|市|村|街|县|单元|栋|楼|室|巷|组|苑|园|里|幢|弄|房|座|大厦|户|排|屯|广场|中心|大学|百货|大道|城)/g)

							if (result == null || result.length < 2) {
								AtdToast.fail("地址格式有误，请重新输入")
								return false
							}

							if (postdata.income == "") {
								AtdToast.fail("月收入不能为空")
								return false
							}
							if (postdata.company_address == "") {
								AtdToast.fail("公司地址不能为空")
								return false
							}


						}
						if (postdata.work_email == "") {
							AtdToast.fail("邮箱不能为空")
							return false
						}
						if (!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(postdata.work_email))) {
							AtdToast.fail("邮箱格式有误，请重新输入")
							return false
						}

						_HTTP.post('LoansDispatch/saveLoanInfo', Qs.stringify(postdata))
							.then(response => {
								if (response.data.code == 0) {
									this.props.history.push('./workflowstep4')
								} else {
									AtdToast.fail(response.data.message)
								}
							})
					}} />
				</div>
			</div>
		)
	}
}