import Vue from 'vue'
import Router from 'vue-router'
import Home from '../../components/home/Home.vue'
import Details from '../../components/consult/Details.vue'
import TextConsult from '../../components/consult/TextConsult.vue'
import TelConsult from '../../components/consult/TelConsult.vue'
import EntrustConsult from '../../components/consult/EntrustConsult.vue'
import CustomTelConsult from '../../components/consult/CustomTelConsult.vue'
import CustomEntrustConsult from '../../components/consult/CustomEntrustConsult.vue'
import CustomTextConsult from '../../components/consult/CustomTextConsult.vue'
import Pay from '../../components/pay/Pay.vue'
import Success from '../../components/pay/Success.vue'
import CoreApply from '../../components/core/CoreApply.vue'
import ApplyDescription from '../../components/core/ApplyDescription.vue'
import ApplySuccess from '../../components/core/ApplySuccess.vue'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/text/:price/:businessType/:businessId/:userId',
      name: 'text',
      component: TextConsult,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/tel/:price/:businessType/:businessId/:userId',
      name: 'tel',
      component: TelConsult,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/entrust/:price/:businessType/:businessId/:userId',
      name: 'entrust',
      component: EntrustConsult,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/customentrust/:price/:businessType/:businessId/:userId',
      name: 'customentrust',
      component: CustomEntrustConsult,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/customtel/:price/:businessType/:businessId/:userId',
      name: 'customtel',
      component: CustomTelConsult,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/customtext/:price/:businessType/:businessId/:userId',
      name: 'customtext',
      component: CustomTextConsult,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/details/:userId/:questionId',
      name: 'details',
      component: Details,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/pay',
      name: 'pay',
      component: Pay,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/success',
      name: 'success',
      component: Success,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/apply',
      name: 'apply',
      component: CoreApply,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/description',
      name: 'desc',
      component: ApplyDescription,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/applysuc',
      name: 'applysuc',
      component: ApplySuccess,
    },
    {
      path: '/:userId',
      name: 'home',
      component: Home,
      meta: {
        keepAlive: true
      }
    },
    // 404 页面
    {
      path: '*',
      component: Home,
      redirect:'/:userId'
    }
  ]
})
