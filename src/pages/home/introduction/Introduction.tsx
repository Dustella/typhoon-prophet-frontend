const Index = () => {
  return (
    <div class="hero h-full">
      <div class="hero-content flex-col lg:flex-row">
        <div class="card card-compact w-96 bg-base-100 shadow-xl">
          <figure>
            <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="#" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">UNet</h2>
            <p>一句关于模型的简单介绍</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">查看详细</button>
            </div>
          </div>
        </div>
        <div class="card card-compact w-96 bg-base-100 shadow-xl">
          <figure>
            <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="#" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">另一个模型</h2>
            <p>一句关于模型的简单介绍</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">查看详细</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index