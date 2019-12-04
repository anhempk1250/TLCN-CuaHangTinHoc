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
    public $incrementing = false;


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
        return ['list' => $products];
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
            $product->cost_price = $request->cost_price;
            $product->employee_id = $request->user->id;
            $product->status = 1;
            $product->save();

             for($i =1;$i<=4;$i++) {
                 $imageName = $i.'.png';//$request->id.'_'.$i.'.'.$request->file('image'.$i)->getClientOriginalExtension();
                 $key = 'image'.$i;
                 $path = Storage::putFileAs('public/images/'.$request->id, $request->file($key), $imageName);
             }

            return [
                'msg' => 'Thêm thành công',
                'RequestSuccess' => true
            ];
        }
        else
            return [
                'msg' => 'Mã sản phẩm đã tồn tại',
                'RequestSuccess' => false
            ];

        return 'Thêm sản phẩm thất bại';
    }

    public function updateProduct(Request $request) {
        $product = Product::find($request->id);
        if($product) {
            $product->name = $request->name;
            $product->productCount = $request->productCount;
            $product->Description = $request->property;
            $product->product_category_id = $request->product_category_id;
            $product->producer_id = $request->producer_id;
            $product->price = $request->price;
            $product->cost_price = $request->cost_price;
            $product->employee_id = $request->user->id;
            $product->status = 1;
            $product->save();

            for ($i = 1; $i <= 4; $i++) {
                $imageName = $i . '.png';//$request->id.'_'.$i.'.'.$request->file('image'.$i)->getClientOriginalExtension();
                $key = 'image' . $i;
                $file = $request->file(($key));
                if($file) {
                    $path = Storage::putFileAs('public/images/' . $request->id, $file, $imageName);
                }
            }

            return [
                'msg' => 'Cập nhật thành công',
                'RequestSuccess' => true
            ];
        } else {
            return [
                'msg' => 'Không tìm thấy sản phẩm',
                'RequestSuccess' => false
            ];
        }
    }

    public function deleteProduct(Request $request) {
        $id = $request->id;
        $product = Product::find($id);
        if($product) {
            $product->status = 0;
            $product->save();
            return [
                'msg' => 'Xóa thành công',
                'RequestSuccess' => true
            ];
        } else {}
    }

    public function getStoreProductListFromProductTypePage() {
        $product = Product::where('status','=',1)->get();
        return [
            'list' => $product
        ];
    }
}