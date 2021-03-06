import { mount, createLocalVue } from '@vue/test-utils'
import mixins from '@/mixins'

import TransactionDetails from '@/components/transaction/Details'
import VueI18n from 'vue-i18n'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(VueI18n)
localVue.use(Vuex)

const i18n = new VueI18n({
  locale: 'en-gb',
  fallbackLocale: 'en-gb',
  messages: { 'en-gb': {} },
  silentTranslationWarn: true
})

const store = new Vuex.Store({
  modules: {
    network: {
      namespaced: true,
      getters: {
        height: state => 1000000
      }
    },
    currency: {
      namespaced: true,
      getters: {
        symbol: state => '$'
      }
    }
  },
  strict: true
})

describe('transaction/Details', () => {
  it('Should display the transaction details', () => {
    const wrapper = mount(TransactionDetails, {
      propsData: {
        transaction: {
          id: 'transaction-id',
          vendorField: 'vendor-field'
        }
      },
      stubs: {
        'LinkWallet': '<div></div>',
        'LinkBlock': '<div></div>'
      },
      i18n,
      localVue,
      mixins,
      store
    })
    expect(wrapper.findAll('.list-row-border-b')).toHaveLength(5)
    expect(wrapper.findAll('.list-row-border-b-no-wrap')).toHaveLength(2)
    expect(wrapper.findAll('.list-row')).toHaveLength(1)
  })
})
