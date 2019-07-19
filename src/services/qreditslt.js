import axios from 'axios'
import moment from 'moment'
import store from '@/store'

class QreditSltService {
  async getTransaction (transactionid) {
    const response = await axios
      .get(`https://qae.altilly.com/api/transaction/${transactionid}`)

    return response.data // .transform(response.data.Data, dateTimeFormat)
  }

  async getToken (tokenid) {
    const response = await axios
      .get(`https://qae.altilly.com/api/token/${tokenid}`)

    return response.data // .transform(response.data.Data, dateTimeFormat)
  }

  async getTransactions (tokenid) {
    const response = await axios
      .get(`https://qae.altilly.com/api/transactions/${tokenid}`)

    return response.data // .transform(response.data.Data, dateTimeFormat)
  }
}

export default new QreditSltService()
