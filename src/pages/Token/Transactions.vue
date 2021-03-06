<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t("Transactions") }}</ContentHeader>
    <section class="page-section py-5 md:py-10">
      <div class="hidden sm:block">
        <TableTransactionsDesktop :transactions="transactions" />
      </div>
      <div class="sm:hidden">
        <TableTransactionsMobile :transactions="transactions" />
      </div>
      <Paginator
        v-if="showPaginator"
        :previous="meta.previous"
        :next="meta.next"
        @previous="onPrevious"
        @next="onNext"
      />
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import TransactionService from '@/services/transaction'

export default {
  data: () => ({
    transactions: null,
    meta: null,
    currentPage: 0
  }),

  computed: {
    showPaginator () {
      return this.meta && (this.meta.previous || this.meta.next)
    },

    id () {
      return this.$route.params.id
    }
  },

  watch: {
    currentPage () {
      this.changePage()
    }
  },

  async beforeRouteEnter (to, from, next) {
    try {
      const { meta, data } = await TransactionService.byBlock(to.params.id, to.params.page)

      next(vm => {
        vm.currentPage = to.params.page
        vm.setTransactions(data)
        vm.setMeta(meta)
      })
    } catch (e) { next({ name: '404' }) }
  },

  async beforeRouteUpdate (to, from, next) {
    this.transactions = null
    this.meta = null

    try {
      const { meta, data } = await TransactionService.byBlock(to.params.id, to.params.page)

      this.currentPage = to.params.page
      this.setTransactions(data)
      this.setMeta(meta)
      next()
    } catch (e) { next({ name: '404' }) }
  },

  methods: {
    setTransactions (transactions) {
      if (!transactions) {
        return
      }

      this.transactions = transactions
    },

    setMeta (meta) {
      this.meta = meta
    },

    onPrevious () {
      this.currentPage = Number(this.currentPage) - 1
    },

    onNext () {
      this.currentPage = Number(this.currentPage) + 1
    },

    changePage (page) {
      this.$router.push({
        name: 'block-transactions',
        params: {
          id: this.id,
          page: this.currentPage
        }
      })
    }
  }
}
</script>
