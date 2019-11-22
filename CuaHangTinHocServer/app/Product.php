<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\FileUpload;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    //
    protected $table = "Product";
    public $timestamps = false;

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function firstImage() {
        return $this->hasOne(Image::class);
    }

    public function discounts()
    {
        return $this->belongsTo(Discount::class);
    }

    public function employee()
    {
        return $this->belongsTo(EmployeeAccount::class);
    }

    public function producer()
    {
        return $this->belongsTo(Producer::class);
    }

    public function productTypeList() {
        return $this
            ->belongsToMany(Product_Type::class,"list_product_with_type","product_id","product_type_id");
    }

    public function category()
    {
        return $this->belongsTo(Product_Category::class,'product_category_id');
    }


    public function getSummaryProductList()
    {
        $myProduct = DB::table('Product')
            ->leftjoin('Discount', 'Product.discount_id', '=', 'Discount.ID')
            ->leftjoin('image', 'Product.ID', '=', 'image.product_id')
            ->select('Product.ID', 'Product.Name', 'Product.Price', 'Product.Description',
                'Discount.ID as ID_Discount', 'Discount.Name as DiscountName', 'Discount.Percent_Discount',
                'image.ID as ImageID', 'image.image_link')
            ->where('image.ID', '=', 1)
            ->get();

        return $myProduct;//Product::with(['images'])->find(1);
    }

    public function getProduct(Request $request) {
        $id = $request->input('id');
        $product = Product::with(['images'])->find($id);
        return $product;
    }

    public function getStoreProductList() {
        $products = Product::with('category','producer','productTypeList','discounts','images','employee')
            ->get();
        return $products;
    }

    public function insertProduct(Request $request) {
         if(!Product::find($request->id)) {
            $product = new Product();
            $product->id = $request->id;
            $product->name =$request->name;
            $product->productCount =$request->productCount;
            $product->Description = $request->property;
            $product->product_category_id = $request->product_category_id;
            $product->producer_id = $request->producer_id;
            $product->price = $request->price;
            $product->costPrice = $request->costPrice;
            $product->employee_id = $request->user->id;
            $product->status = 1;
            $product->save();
            $str = 0;


            $imageName1 = $request->id.'_2.'.$request->file('image2')->getClientOriginalExtension();
            $image1 = new Image();
            $image1->image_link = $imageName1;
            $image1->product_id = $product->id;
            $image1->save();
            $path1 = Storage::putFileAs('public/images',$request->file('image1'),$imageName1);



            $imageName2 =$request->id.'_2.'.$request->file('image3')->getClientOriginalExtension();
            $image2 = new Image();
            $image2->image_link = $imageName2;
            $image2->product_id = $product->id;
            $image2->save();
            $path2 = Storage::putFileAs('public/images',$request->file('image2'),$imageName2);


            $imageName3 = $request->id.'_3.'.$request->file('image3')->getClientOriginalExtension();
            $path3 = Storage::putFileAs('public/images',$request->file('image3'),$imageName3);
             $image3 = new Image();
             $image3->image_link = $imageName3;
             $image3->product_id = $product->id;
             $image3->save();


             $imageName4 = $request->id.'_4.'.$request->file('image4')->getClientOriginalExtension();
            $path4 = Storage::putFileAs('public/images',$request->file('image4'),$imageName4);
             $image4 = new Image();
             $image4->image_link = $imageName4;
             $image4->product_id = $product->id;
             $image4->save();
            return 'Thêm thành công';
        }
        else
            return 'Mã sản phẩm đã tồn tại';

        return 'Thêm sản phẩm thất bại';

    }

}