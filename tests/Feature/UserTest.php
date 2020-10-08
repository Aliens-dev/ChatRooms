<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    /** @test */

    public function a_user_can_search_for_other_users()
    {
        $this->withoutExceptionHandling();

        $user = $this->signIn();

        $res = $this->json('GET','/api/users')->assertStatus(200)
            ->assertJson(['success' => true]);
        $this->assertIsArray($res['data']);
    }

    /** @test */
    public function a_user_can_search_via_email()
    {
        $this->withoutExceptionHandling();
        $user = $this->signIn();
        factory(User::class)->create(['email' => 'johndoe@gmail.com']);
        factory(User::class)->create(['email' => 'johdoe@gmail.com']);
        factory(User::class)->create(['email' => 'joeoe@gmail.com']);
        factory(User::class)->create(['email' => 'joe@gmail.com']);
        $res = $this->json('GET', '/api/users', [
            'email' => 'joh'
        ])->assertStatus(200);
        $emails = array_column($res['data'], 'email');
        $this->assertContains('johndoe@gmail.com', $emails);
        $this->assertContains('johdoe@gmail.com', $emails);
    }

    /** @test */
    public function a_user_can_view_his_own_info()
    {
        //$this->withoutExceptionHandling();

        $user = $this->signIn();

        $response = $this->actingAs($user)->json('GET', "/api/users/{$user->id}")
            ->assertStatus(200);
        $this->assertContains($user->name, $response->json(['data']));
    }

    /** @test */
    public function a_user_can_update_his_info()
    {
        $this->withoutExceptionHandling();

        $user = $this->signIn();

        $data = collect([
            'name' => 'nabil',
            'email' => 'nabil@nabil.com',
            'password' => '123456'
        ]);

        $this->actingAs($user)->json('PATCH', "/api/users/{$user->id}", $data->toArray())
            ->assertStatus(200);
        $withoutPassword = $data->except("password")->toArray();
        $this->assertDatabaseHas('users', $withoutPassword);
        $this->assertTrue(Hash::check($data->get("password"),User::find($user->id)->password));
    }

    /** @test */

    public function cannot_update_to_an_already_exsited_email()
    {

        $user = $this->signIn();

        $otherUser = factory('App\User')->create();

        $data = collect([
            'name' => 'nabil',
            'email' => $otherUser->email,
            'password' => '123456'
        ]);

        $this->actingAs($user)->json('PATCH', "/api/users/{$user->id}", $data->toArray())
            ->assertStatus(401);
        $this->assertDatabaseHas('users', ["id" => $user->id,"email" => $user->email]);
    }

}
